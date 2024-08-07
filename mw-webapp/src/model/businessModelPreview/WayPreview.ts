import {makeAutoObservable} from "mobx";
import {WayStatusType} from "src/logic/waysTable/wayStatus";
import {UserPlain} from "src/model/businessModel/User";
import {WayTag} from "src/model/businessModelPreview/WayTag";

/**
 * Way preview model
 */
export class WayPreview {

  /**
   * Way's UUID
   */
  public uuid: string;

  /**
   * Way's name
   */
  public name: string;

  /**
   * Day reports amount
   */
  public dayReportsAmount: number;

  /**
   * Way's owner
   */
  public owner: UserPlain;

  /**
   * Mentors of this way
   */
  public mentors: UserPlain[];

  /**
   * Way's status "Completed", "In progress", "Abandoned"
   */
  public status: WayStatusType;

  /**
   * Last day when way was updated
   */
  public lastUpdate: Date;

  /**
   * Users for whom this way are favorite
   */
  public favoriteForUsers: number;

  /**
   * Date when way was created
   */
  public createdAt: Date;

  /**
   * Way's tags {@link WayTag}
   */
  public wayTags: WayTag[];

  /**
   * Way's uuid that was copied
   */
  public copiedFromWayUuid: string | null;

  /**
   * Description of goal
   */
  public goalDescription: string;

  /**
   * Estimation time for complete goal
   */
  public estimationTime: number;

  /**
   * Amount of metric done
   */
  public metricsDone: number;

  /**
   * Amount of all metric
   */
  public metricsTotal: number;

  /**
   * Is way private
   * @default false
   */
  public isPrivate: boolean;

  /**
   * Array of children Ways UUID
   */
  public childrenUuids: string[];

  constructor(wayData: WayPreview) {
    makeAutoObservable(this);
    this.uuid = wayData.uuid;
    this.name = wayData.name;
    this.owner = wayData.owner;
    this.mentors = wayData.mentors;
    this.status = wayData.status;
    this.lastUpdate = wayData.lastUpdate;
    this.favoriteForUsers = wayData.favoriteForUsers;
    this.createdAt = wayData.createdAt;
    this.wayTags = wayData.wayTags;
    this.copiedFromWayUuid = wayData.copiedFromWayUuid;
    this.goalDescription = wayData.goalDescription;
    this.estimationTime = wayData.estimationTime;
    this.metricsDone = wayData.metricsDone;
    this.metricsTotal = wayData.metricsTotal;
    this.isPrivate = wayData.isPrivate;
    this.dayReportsAmount = wayData.dayReportsAmount;
    this.childrenUuids = wayData.childrenUuids;
  }

}
