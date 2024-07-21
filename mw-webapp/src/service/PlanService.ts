import {
  CreatePlanRequest,
  DeletePlanRequest,
  SchemasPlanPopulatedResponse,
  UpdatePlanRequest,
} from "src/apiAutogenerated/general";
import {planService} from "src/service/services";

/**
 * Provides methods to interact with the plans
 */
export class PlanService {

  /**
   * Create plan
   */
  public static async createPlan(requestParameters: CreatePlanRequest): Promise<SchemasPlanPopulatedResponse> {
    const plan = await planService.createPlan(requestParameters);

    return plan;
  }

  /**
   * Update plan
   */
  public static async updatePlan(requestParameters: UpdatePlanRequest): Promise<SchemasPlanPopulatedResponse> {
    const updatedPlan = planService.updatePlan(requestParameters);

    return updatedPlan;
  }

  /**
   * Delete plan by UUID
   */
  public static async deletePlan(requestParameters: DeletePlanRequest): Promise<void> {
    await planService.deletePlan(requestParameters);
  }

}
