package controllers

import (
	"context"
	"database/sql"
	"net/http"
	"time"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/samber/lo"
)

type ProblemController struct {
	db  *db.Queries
	ctx context.Context
}

func NewProblemController(db *db.Queries, ctx context.Context) *ProblemController {
	return &ProblemController{db, ctx}
}

// Create Problem  handler
// @Summary Create a new problem
// @Description
// @Tags problem
// @ID create-problem
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateProblemPayload true "query params"
// @Success 200 {object} schemas.ProblemPopulatedResponse
// @Router /problems [post]
func (cc *ProblemController) CreateProblem(ctx *gin.Context) {
	var payload *schemas.CreateProblemPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := &db.CreateProblemParams{
		CreatedAt:     now,
		UpdatedAt:     now,
		Description:   payload.Description,
		IsDone:        payload.IsDone,
		OwnerUuid:     uuid.MustParse(payload.OwnerUuid),
		DayReportUuid: uuid.MustParse(payload.DayReportUuid),
	}

	problem, err := cc.db.CreateProblem(ctx, *args)
	util.HandleErrorGin(ctx, err)

	tags := lo.Map(problem.TagUuids, func(tagUuidStringified string, i int) schemas.JobTagResponse {
		tagUuid := uuid.MustParse(tagUuidStringified)
		tag, _ := cc.db.GetJobTagByUuid(ctx, tagUuid)
		return schemas.JobTagResponse{
			Uuid:        tag.Uuid.String(),
			Name:        tag.Name,
			Description: tag.Description,
			Color:       tag.Color,
		}
	})
	response := schemas.ProblemPopulatedResponse{
		Uuid:          problem.Uuid.String(),
		CreatedAt:     problem.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:     problem.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		Description:   problem.Description,
		IsDone:        problem.IsDone,
		OwnerUuid:     problem.OwnerUuid.String(),
		OwnerName:     problem.OwnerName,
		DayReportUuid: problem.DayReportUuid.String(),
		Tags:          tags,
	}

	ctx.JSON(http.StatusOK, response)
}

// Update Problem handler
// @Summary Update problem by UUID
// @Description
// @Tags problem
// @ID update-problem
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateProblemPayload true "query params"
// @Param problemId path string true "problem ID"
// @Success 200 {object} schemas.ProblemPopulatedResponse
// @Router /problems/{problemId} [patch]
func (cc *ProblemController) UpdateProblem(ctx *gin.Context) {
	var payload *schemas.UpdateProblemPayload
	problemId := ctx.Param("problemId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := &db.UpdateProblemParams{
		Uuid:        uuid.MustParse(problemId),
		UpdatedAt:   sql.NullTime{Time: now, Valid: true},
		IsDone:      sql.NullBool{Bool: payload.IsDone, Valid: true},
		Description: sql.NullString{String: payload.Description, Valid: payload.Description != ""},
	}

	problem, err := cc.db.UpdateProblem(ctx, *args)
	util.HandleErrorGin(ctx, err)

	tagUuids := lo.Map(problem.TagUuids, func(stringifiedUuid string, i int) uuid.UUID {
		return uuid.MustParse(stringifiedUuid)
	})
	dbTags, _ := cc.db.GetListLabelsByLabelUuids(ctx, tagUuids)
	tags := lo.Map(dbTags, func(dbTag db.JobTag, i int) schemas.JobTagResponse {
		return schemas.JobTagResponse{
			Uuid:        dbTag.Uuid.String(),
			Name:        dbTag.Name,
			Description: dbTag.Description,
			Color:       dbTag.Color,
		}
	})

	response := schemas.ProblemPopulatedResponse{
		Uuid:          problem.Uuid.String(),
		CreatedAt:     problem.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:     problem.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		Description:   problem.Description,
		IsDone:        problem.IsDone,
		OwnerUuid:     problem.OwnerUuid.String(),
		OwnerName:     problem.OwnerName,
		DayReportUuid: problem.DayReportUuid.String(),
		Tags:          tags,
	}

	ctx.JSON(http.StatusOK, response)
}

// Deleting Problem handlers
// @Summary Delete problem by UUID
// @Description
// @Tags problem
// @ID delete-problem
// @Accept  json
// @Produce  json
// @Param problemId path string true "problem ID"
// @Success 200
// @Router /problems/{problemId} [delete]
func (cc *ProblemController) DeleteProblemById(ctx *gin.Context) {
	problemId := ctx.Param("problemId")

	err := cc.db.DeleteProblem(ctx, uuid.MustParse(problemId))
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
