import {SchemasDayReportPopulatedResponse} from "src/apiAutogenerated";
import {CommentDTOToComment} from "src/dataAccessLogic/DTOToPreviewConverter/CommentDTOToComment";
import {JobDoneDTOToJobDone} from "src/dataAccessLogic/DTOToPreviewConverter/JobDoneDTOToJobDone";
import {PlanDTOToPlan} from "src/dataAccessLogic/DTOToPreviewConverter/PlanDTOToPlan";
import {ProblemDTOToProblem} from "src/dataAccessLogic/DTOToPreviewConverter/ProblemDTOToProblem";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * DayReport  converter params
 */
interface DayReportConverterParams {

  /**
   * DayReport DTO
   */
  dayReportDTO: SchemasDayReportPopulatedResponse;

  /**
   * Job's way name
   */
  wayName: string;

  /**
   *Job's way uuid
   */
  wayUuid: string;
}

/**
 * Convert {@link DayReportDTO} to {@link DayReport}
 */
export const DayReportDTOToDayReport = (params: DayReportConverterParams): DayReport => {
  const plans = params.dayReportDTO.plans.map(plan => PlanDTOToPlan({
    planDTO: plan,
    wayName: params.wayName,
    wayUuid: params.wayUuid,
  }),
  );

  const jobsDone = params.dayReportDTO.jobsDone.map(job => JobDoneDTOToJobDone({
    jobDoneDTO: job,
    wayName: params.wayName,
    wayUuid: params.wayUuid,
  }),
  );

  const problems = params.dayReportDTO.problems.map(problem => ProblemDTOToProblem({
    problemDTO: problem,
    wayName: params.wayName,
    wayUuid: params.wayUuid,
  }),
  );

  const comments = params.dayReportDTO.comments.map(comment => CommentDTOToComment({
    commentDTO: comment,
    wayName: params.wayName,
    wayUuid: params.wayUuid,
  }),
  );

  return new DayReport({
    ...params.dayReportDTO,
    createdAt: new Date(params.dayReportDTO.createdAt),
    updatedAt: new Date(params.dayReportDTO.updatedAt),
    jobsDone,
    plans,
    problems,
    comments,
  });
};
