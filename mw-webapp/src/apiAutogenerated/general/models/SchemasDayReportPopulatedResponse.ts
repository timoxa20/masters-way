// @ts-nocheck
/* eslint-disable */
/**
 * Masters way general API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { SchemasCommentPopulatedResponse } from './SchemasCommentPopulatedResponse';
import {
    SchemasCommentPopulatedResponseFromJSON,
    SchemasCommentPopulatedResponseFromJSONTyped,
    SchemasCommentPopulatedResponseToJSON,
} from './SchemasCommentPopulatedResponse';
import type { SchemasJobDonePopulatedResponse } from './SchemasJobDonePopulatedResponse';
import {
    SchemasJobDonePopulatedResponseFromJSON,
    SchemasJobDonePopulatedResponseFromJSONTyped,
    SchemasJobDonePopulatedResponseToJSON,
} from './SchemasJobDonePopulatedResponse';
import type { SchemasPlanPopulatedResponse } from './SchemasPlanPopulatedResponse';
import {
    SchemasPlanPopulatedResponseFromJSON,
    SchemasPlanPopulatedResponseFromJSONTyped,
    SchemasPlanPopulatedResponseToJSON,
} from './SchemasPlanPopulatedResponse';
import type { SchemasProblemPopulatedResponse } from './SchemasProblemPopulatedResponse';
import {
    SchemasProblemPopulatedResponseFromJSON,
    SchemasProblemPopulatedResponseFromJSONTyped,
    SchemasProblemPopulatedResponseToJSON,
} from './SchemasProblemPopulatedResponse';

/**
 * 
 * @export
 * @interface SchemasDayReportPopulatedResponse
 */
export interface SchemasDayReportPopulatedResponse {
    /**
     * 
     * @type {Array<SchemasCommentPopulatedResponse>}
     * @memberof SchemasDayReportPopulatedResponse
     */
    comments: Array<SchemasCommentPopulatedResponse>;
    /**
     * 
     * @type {string}
     * @memberof SchemasDayReportPopulatedResponse
     */
    createdAt: string;
    /**
     * 
     * @type {boolean}
     * @memberof SchemasDayReportPopulatedResponse
     */
    isDayOff: boolean;
    /**
     * 
     * @type {Array<SchemasJobDonePopulatedResponse>}
     * @memberof SchemasDayReportPopulatedResponse
     */
    jobsDone: Array<SchemasJobDonePopulatedResponse>;
    /**
     * 
     * @type {Array<SchemasPlanPopulatedResponse>}
     * @memberof SchemasDayReportPopulatedResponse
     */
    plans: Array<SchemasPlanPopulatedResponse>;
    /**
     * 
     * @type {Array<SchemasProblemPopulatedResponse>}
     * @memberof SchemasDayReportPopulatedResponse
     */
    problems: Array<SchemasProblemPopulatedResponse>;
    /**
     * 
     * @type {string}
     * @memberof SchemasDayReportPopulatedResponse
     */
    updatedAt: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasDayReportPopulatedResponse
     */
    uuid: string;
}

/**
 * Check if a given object implements the SchemasDayReportPopulatedResponse interface.
 */
export function instanceOfSchemasDayReportPopulatedResponse(
    value: object
): boolean {
    let isInstance = true;
    isInstance = isInstance && "comments" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "isDayOff" in value;
    isInstance = isInstance && "jobsDone" in value;
    isInstance = isInstance && "plans" in value;
    isInstance = isInstance && "problems" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "uuid" in value;

    return isInstance;
}

export function SchemasDayReportPopulatedResponseFromJSON(json: any): SchemasDayReportPopulatedResponse {
    return SchemasDayReportPopulatedResponseFromJSONTyped(json, false);
}

export function SchemasDayReportPopulatedResponseFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasDayReportPopulatedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'comments': ((json['comments'] as Array<any>).map(SchemasCommentPopulatedResponseFromJSON)),
        'createdAt': json['createdAt'],
        'isDayOff': json['isDayOff'],
        'jobsDone': ((json['jobsDone'] as Array<any>).map(SchemasJobDonePopulatedResponseFromJSON)),
        'plans': ((json['plans'] as Array<any>).map(SchemasPlanPopulatedResponseFromJSON)),
        'problems': ((json['problems'] as Array<any>).map(SchemasProblemPopulatedResponseFromJSON)),
        'updatedAt': json['updatedAt'],
        'uuid': json['uuid'],
    };
}


export function SchemasDayReportPopulatedResponseToJSON(value?: SchemasDayReportPopulatedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'comments': ((value.comments as Array<any>).map(SchemasCommentPopulatedResponseToJSON)),
        'createdAt': value.createdAt,
        'isDayOff': value.isDayOff,
        'jobsDone': ((value.jobsDone as Array<any>).map(SchemasJobDonePopulatedResponseToJSON)),
        'plans': ((value.plans as Array<any>).map(SchemasPlanPopulatedResponseToJSON)),
        'problems': ((value.problems as Array<any>).map(SchemasProblemPopulatedResponseToJSON)),
        'updatedAt': value.updatedAt,
        'uuid': value.uuid,
    };
}

