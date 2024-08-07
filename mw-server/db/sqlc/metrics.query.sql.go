// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: metrics.query.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const createMetric = `-- name: CreateMetric :one
INSERT INTO metrics(
    updated_at,
    description,
    is_done,
    done_date,
    metric_estimation,
    way_uuid
) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
) RETURNING uuid, created_at, updated_at, description, is_done, done_date, metric_estimation, way_uuid
`

type CreateMetricParams struct {
	UpdatedAt        pgtype.Timestamp `json:"updated_at"`
	Description      string           `json:"description"`
	IsDone           bool             `json:"is_done"`
	DoneDate         pgtype.Timestamp `json:"done_date"`
	MetricEstimation int32            `json:"metric_estimation"`
	WayUuid          pgtype.UUID      `json:"way_uuid"`
}

func (q *Queries) CreateMetric(ctx context.Context, arg CreateMetricParams) (Metric, error) {
	row := q.db.QueryRow(ctx, createMetric,
		arg.UpdatedAt,
		arg.Description,
		arg.IsDone,
		arg.DoneDate,
		arg.MetricEstimation,
		arg.WayUuid,
	)
	var i Metric
	err := row.Scan(
		&i.Uuid,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Description,
		&i.IsDone,
		&i.DoneDate,
		&i.MetricEstimation,
		&i.WayUuid,
	)
	return i, err
}

const deleteMetric = `-- name: DeleteMetric :one
DELETE FROM metrics
WHERE uuid = $1
RETURNING uuid, created_at, updated_at, description, is_done, done_date, metric_estimation, way_uuid
`

func (q *Queries) DeleteMetric(ctx context.Context, metricsUuid pgtype.UUID) (Metric, error) {
	row := q.db.QueryRow(ctx, deleteMetric, metricsUuid)
	var i Metric
	err := row.Scan(
		&i.Uuid,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Description,
		&i.IsDone,
		&i.DoneDate,
		&i.MetricEstimation,
		&i.WayUuid,
	)
	return i, err
}

const getListMetricsByWayUuid = `-- name: GetListMetricsByWayUuid :many
SELECT uuid, created_at, updated_at, description, is_done, done_date, metric_estimation, way_uuid FROM metrics
WHERE metrics.way_uuid = $1
ORDER BY created_at
`

func (q *Queries) GetListMetricsByWayUuid(ctx context.Context, wayUuid pgtype.UUID) ([]Metric, error) {
	rows, err := q.db.Query(ctx, getListMetricsByWayUuid, wayUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Metric{}
	for rows.Next() {
		var i Metric
		if err := rows.Scan(
			&i.Uuid,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.Description,
			&i.IsDone,
			&i.DoneDate,
			&i.MetricEstimation,
			&i.WayUuid,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const isAllMetricsDone = `-- name: IsAllMetricsDone :one
SELECT COUNT(*) = 0 AS all_done
FROM metrics
WHERE way_uuid = $1
AND is_done = false
`

func (q *Queries) IsAllMetricsDone(ctx context.Context, wayUuid pgtype.UUID) (bool, error) {
	row := q.db.QueryRow(ctx, isAllMetricsDone, wayUuid)
	var all_done bool
	err := row.Scan(&all_done)
	return all_done, err
}

const updateMetric = `-- name: UpdateMetric :one
WITH updated AS (
    UPDATE metrics
    SET
        updated_at = coalesce($1, updated_at),
        description = coalesce($2, description),
        is_done = coalesce($3, is_done),
        done_date = coalesce($4, done_date),
        metric_estimation = coalesce($5, metric_estimation)
    WHERE uuid = $6
    RETURNING uuid, created_at, updated_at, description, is_done, done_date, metric_estimation, way_uuid
)
SELECT uuid, created_at, updated_at, description, is_done, done_date, metric_estimation, way_uuid
FROM updated
ORDER BY created_at ASC
`

type UpdateMetricParams struct {
	UpdatedAt        pgtype.Timestamp `json:"updated_at"`
	Description      pgtype.Text      `json:"description"`
	IsDone           pgtype.Bool      `json:"is_done"`
	DoneDate         pgtype.Timestamp `json:"done_date"`
	MetricEstimation pgtype.Int4      `json:"metric_estimation"`
	Uuid             pgtype.UUID      `json:"uuid"`
}

type UpdateMetricRow struct {
	Uuid             pgtype.UUID      `json:"uuid"`
	CreatedAt        pgtype.Timestamp `json:"created_at"`
	UpdatedAt        pgtype.Timestamp `json:"updated_at"`
	Description      string           `json:"description"`
	IsDone           bool             `json:"is_done"`
	DoneDate         pgtype.Timestamp `json:"done_date"`
	MetricEstimation int32            `json:"metric_estimation"`
	WayUuid          pgtype.UUID      `json:"way_uuid"`
}

func (q *Queries) UpdateMetric(ctx context.Context, arg UpdateMetricParams) (UpdateMetricRow, error) {
	row := q.db.QueryRow(ctx, updateMetric,
		arg.UpdatedAt,
		arg.Description,
		arg.IsDone,
		arg.DoneDate,
		arg.MetricEstimation,
		arg.Uuid,
	)
	var i UpdateMetricRow
	err := row.Scan(
		&i.Uuid,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Description,
		&i.IsDone,
		&i.DoneDate,
		&i.MetricEstimation,
		&i.WayUuid,
	)
	return i, err
}
