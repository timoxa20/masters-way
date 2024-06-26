// @ts-nocheck
/* eslint-disable */
/**
 * Masters way API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  SchemasCommentPopulatedResponse,
} from '../models/index';
import {
    SchemasCommentPopulatedResponseFromJSON,
    SchemasCommentPopulatedResponseToJSON,
} from '../models/index';

export interface BeginAuthRequest {
    provider: string;
}

/**
 * 
 */
export class BeginAuthApi extends runtime.BaseAPI {

    /**
     * Update comment by UUID
     */
    async beginAuthRaw(requestParameters: BeginAuthRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SchemasCommentPopulatedResponse>> {
        if (requestParameters.provider === null || requestParameters.provider === undefined) {
            throw new runtime.RequiredError('provider','Required parameter requestParameters.provider was null or undefined when calling beginAuth.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/auth/{provider}`.replace(`{${"provider"}}`, encodeURIComponent(String(requestParameters.provider))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SchemasCommentPopulatedResponseFromJSON(jsonValue));
    }

    /**
     * Update comment by UUID
     */
    async beginAuth(requestParameters: BeginAuthRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SchemasCommentPopulatedResponse> {
        const response = await this.beginAuthRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
