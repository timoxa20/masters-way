import {createColumnHelper} from "@tanstack/react-table";
import {Button} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Сheckbox";
import {EditableText} from "src/component/editableText/EditableText";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {CommentDAL} from "src/dataAccessLogic/CommentDAL";
import {CurrentProblemDAL} from "src/dataAccessLogic/CurrentProblemDAL";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {PlanForNextPeriodDAL} from "src/dataAccessLogic/PlanForNextPeriodDAL";
import {useGlobalContext} from "src/GlobalContext";
import {Comment} from "src/model/businessModel/Comment";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {DateUtils} from "src/utils/DateUtils";
import styles from "src/logic/wayPage/reportsTable/WayColumns.module.scss";

const DEFAULT_SUMMARY_TIME = 0;
const columnHelper = createColumnHelper<DayReport>();

/**
 * Get user name
 */
const getName = (mentors: Map<string, UserPreview>, mentorUuid: string, ownerName: string) => {
  const mentor = mentors.get(mentorUuid);
  const name = mentor ? mentor.name : ownerName;

  return name;
};

/**
 * Columns props
 */
interface ColumnsProps {

  /**
   * DayReports
   */
  dayReports: DayReport[];

  /**
   * Callback that change dayReports
   */
  setDayReports: (dayReports: DayReport[]) => void;

  /**
   * Way's mentors
   * @key @User.uuid
   * @value @UserPreview
   */
  mentors: Map<string, UserPreview>;

  /**
   * Way
   */
  way: WayPreview;
}

/**
 * Update DayReport state
 */
const updateDayReportState = (
  dayReports: DayReport[],
  setReports: (dayReports: DayReport[]) => void,
  updatedDayReport: DayReport) => {
  const updatedDayReports = dayReports.map((item) => {
    if (item.uuid === updatedDayReport.uuid) {
      return updatedDayReport;
    }

    return item;
  });

  setReports(updatedDayReports);
};

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const Columns = (props: ColumnsProps) => {
  const {user} = useGlobalContext();
  const ownerUuid = props.way.owner.uuid;
  const ownerName = props.way.owner.name;
  const isOwner = user?.uuid === ownerUuid;
  const isMentor = !!user && !!user.uuid && props.mentors.has(user.uuid);
  const isUserOwnerOrMentor = isOwner || isMentor;

  const columns = [
    columnHelper.accessor("date", {
      header: "Date",

      /**
       * Cell  with date value
       */
      cell: ({row}) => {

        /**
         * Update isDayOff
         */
        const updateIsDayOff = async (value: boolean) => {
          await DayReportDAL.updateIsDayOff(row.original, value);
          const updatedDayReport = {...row.original, isDayOff: value};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        return (
          <VerticalContainer>
            {DateUtils.getShortISODateValue(row.original.date)}
            <Tooltip
              content="is day off ?"
              position={PositionTooltip.TOP}
            >
              <Checkbox
                isDefaultChecked={row.original.isDayOff}
                onChange={(value) => isOwner && updateIsDayOff(value)}
                isEditable={isOwner}
              />
            </Tooltip>
          </VerticalContainer>
        );
      },
    }),
    columnHelper.accessor("jobsDone", {
      header: "Jobs done (minutes)",

      /**
       * Cell with JobsDone items
       */
      cell: ({row}) => {

        /**
         * Create jobDone
         */
        const createJobDone = async () => {
          const jobDone = await JobDoneDAL.createJobDone(row.original);
          const jobsDone = [...row.original.jobsDone, jobDone];
          const updatedDayReport = {...row.original, jobsDone};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update jobDone
         */
        const updateJobDone = async (jobDone: JobDone, text: string) => {
          await JobDoneDAL.updateJobDone(jobDone, text);
          const updatedJobsDone = row.original.jobsDone.map((item) => {
            if (item.uuid === jobDone.uuid) {
              return new JobDone({
                ...jobDone,
                description: text,
              });
            }

            return item;
          });

          const updatedDayReport = {...row.original, jobsDone: updatedJobsDone};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update jobDoneTime
         */
        const updateJobDoneTime = async (jobDone: JobDone, text: number) => {
          await JobDoneDAL.updateJobDoneTime(jobDone, text);
          const updatedJobsDone = row.original.jobsDone.map((item) => {
            if (item.uuid === jobDone.uuid) {
              return new JobDone({
                ...jobDone,
                time: text,
              });
            }

            return item;
          });

          const updatedDayReport = {...row.original, jobsDone: updatedJobsDone};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        return (
          <VerticalContainer className={styles.cell}>
            <ol className={styles.numberedList}>
              {row.original.jobsDone.map((jobDone) => (
                <li key={jobDone.uuid}>
                  <HorizontalContainer className={styles.numberedListItem}>
                    <EditableTextarea
                      text={jobDone.description}
                      onChangeFinish={(text) => updateJobDone(jobDone, text)}
                      isEditable={isOwner}
                      className={styles.editableTextarea}
                    />
                    <EditableText
                      text={jobDone.time}
                      onChangeFinish={(text) => updateJobDoneTime(jobDone, text)}
                      className={styles.editableTime}
                      isEditable={isOwner}
                    />
                  </HorizontalContainer>
                </li>
              ))}
            </ol>
            <div className={styles.jobDoneSummarySection}>
              {isOwner &&
                <Button
                  value="add job"
                  onClick={createJobDone}
                />
              }
              <span>
                {"Summary time: "}
                {row.original.jobsDone
                  .reduce((summaryTime, jobDone) => jobDone.time + summaryTime, DEFAULT_SUMMARY_TIME)
                }
              </span>
            </div>
          </VerticalContainer>
        );
      },
    }),
    columnHelper.accessor("plansForNextPeriod", {
      header: "Plans for tomorrow (minutes)",

      /**
       * Cell with PlanForNextPeriod items
       */
      cell: ({row}) => {

        /**
         * Create PlanForNextPeriod
         */
        const createPlanForNextPeriod = async (userUuid: string) => {
          const planForNextPeriod = await PlanForNextPeriodDAL.createPlanForNextPeriod(row.original, userUuid);
          const plansForNextPeriod = [...row.original.plansForNextPeriod, planForNextPeriod];
          const updatedDayReport = {...row.original, plansForNextPeriod};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update PlanForNextPeriod
         */
        const updatePlanForNextPeriod = async (planForNextPeriod: PlanForNextPeriod, text: string) => {
          await PlanForNextPeriodDAL.updatePlanForNextPeriod(planForNextPeriod, text);
          const updatedPlansForNextPeriod = row.original.plansForNextPeriod.map((item) => {
            if (item.uuid === planForNextPeriod.uuid) {
              return new PlanForNextPeriod({
                ...planForNextPeriod,
                job: text,
              });
            }

            return item;
          });

          const updatedDayReport = {...row.original, plansForNextPeriod: updatedPlansForNextPeriod};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update PlanForNextPeriodTime
         */
        const updatePlanForNextPeriodTime = async (planForNextPeriod: PlanForNextPeriod, text: number) => {
          await PlanForNextPeriodDAL.updatePlanForNextPeriodTime(planForNextPeriod, text);
          const updatedPlansForNextPeriod = row.original.plansForNextPeriod.map((item) => {
            if (item.uuid === planForNextPeriod.uuid) {
              return new PlanForNextPeriod({
                ...planForNextPeriod,
                estimationTime: text,
              });
            }

            return item;
          });

          const updatedDayReport = {...row.original, plansForNextPeriod: updatedPlansForNextPeriod};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        return (
          <VerticalContainer className={styles.cell}>
            <ol className={styles.numberedList}>
              {row.original.plansForNextPeriod.map((planForNextPeriod) => (
                <li key={planForNextPeriod.uuid}>
                  <Link
                    value={getName(props.mentors, planForNextPeriod.ownerUuid, ownerName)}
                    path={pages.user.getPath({uuid: planForNextPeriod.ownerUuid})}
                  />
                  <HorizontalContainer className={styles.numberedListItem}>
                    <EditableTextarea
                      text={planForNextPeriod.job}
                      onChangeFinish={(text) => updatePlanForNextPeriod(planForNextPeriod, text)}
                      isEditable={planForNextPeriod.ownerUuid === user?.uuid}
                      className={styles.editableTextarea}
                    />
                    <EditableText
                      text={planForNextPeriod.estimationTime}
                      onChangeFinish={(value) => updatePlanForNextPeriodTime(planForNextPeriod, value)}
                      className={styles.editableTime}
                      isEditable={planForNextPeriod.ownerUuid === user?.uuid}
                    />
                  </HorizontalContainer>
                </li>
              ))}
            </ol>
            {isUserOwnerOrMentor &&
              <Button
                value="add plan"
                onClick={() => createPlanForNextPeriod(user.uuid)}
              />
            }
          </VerticalContainer>
        );
      },
    }),
    columnHelper.accessor("problemsForCurrentPeriod", {
      header: "Current problems",

      /**
       * Cell with ProblemsForCurrentPeriod items
       */
      cell: ({row}) => {

        /**
         * Create CurrentProblem
         */
        const createCurrentProblem = async (userUuid: string) => {
          const currentProblem = await CurrentProblemDAL.createCurrentProblem(row.original, userUuid);
          const currentProblems = [...row.original.problemsForCurrentPeriod, currentProblem];
          const updatedDayReport = {...row.original, problemsForCurrentPeriod: currentProblems};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update CurrentProblem
         */
        const updateCurrentProblem = async (currentProblem: CurrentProblem, text: string) => {
          await CurrentProblemDAL.updateCurrentProblem(currentProblem, text);
          const updatedCurrentProblems = row.original.problemsForCurrentPeriod.map((item) => {
            if (item.uuid === currentProblem.uuid) {
              return new CurrentProblem({
                ...currentProblem,
                description: text,
              });
            }

            return item;
          });

          const updatedDayReport = {...row.original, problemsForCurrentPeriod: updatedCurrentProblems};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        return (
          <VerticalContainer className={styles.cell}>
            <ol className={styles.numberedList}>
              {row.original.problemsForCurrentPeriod.map((currentProblem) => (
                <li key={currentProblem.uuid}>
                  <Link
                    value={getName(props.mentors, currentProblem.ownerUuid, ownerName)}
                    path={pages.user.getPath({uuid: currentProblem.ownerUuid})}
                  />
                  <EditableTextarea
                    text={currentProblem.description}
                    onChangeFinish={(text) => updateCurrentProblem(currentProblem, text)}
                    isEditable={currentProblem.ownerUuid === user?.uuid}
                    className={styles.editableTextarea}
                  />
                </li>
              ))}
            </ol>
            {isUserOwnerOrMentor &&
              <Button
                value="add problem"
                onClick={() => createCurrentProblem(user.uuid)}
              />
            }
          </VerticalContainer>
        );
      },
    }),
    columnHelper.accessor("comments", {
      header: "Comments",

      /**
       * Cell with Comments items
       */
      cell: ({row}) => {

        /**
         * Create Comment
         */
        const createComment = async (commentatorUuid: string) => {
          const comment = await CommentDAL.createComment(row.original, commentatorUuid);
          const comments = [...row.original.comments, comment];
          const updatedDayReport = {...row.original, comments};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update Comment
         */
        const updateComment = async (comment: Comment, text: string) => {
          await CommentDAL.updateComment(comment, text);
          const updatedComments = row.original.comments.map((item) => {
            const itemToReturn = item.uuid === comment.uuid
              ? new Comment({
                ...comment,
                description: text,
              })
              : item;

            return itemToReturn;
          });

          const updatedDayReport = {...row.original, comments: updatedComments};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        return (
          <VerticalContainer className={styles.cell}>
            {row.original.comments
              .map((comment) => (
                <>
                  <Link
                    value={getName(props.mentors, comment.ownerUuid, ownerName)}
                    path={pages.user.getPath({uuid: comment.ownerUuid})}
                  />
                  <EditableTextarea
                    text={comment.description}
                    onChangeFinish={(text) => updateComment(comment, text)}
                    isEditable={comment.ownerUuid === user?.uuid}
                    className={styles.editableTextarea}
                  />
                </>
              ),
              )}
            {isUserOwnerOrMentor &&
            <Button
              value="add comment"
              onClick={() => createComment(user.uuid)}
            />
            }
          </VerticalContainer>
        );
      },
    }),
  ];

  return columns;
};