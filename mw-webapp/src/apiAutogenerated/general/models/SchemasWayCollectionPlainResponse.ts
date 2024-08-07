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
/**
 * 
 * @export
 * @interface SchemasWayCollectionPlainResponse
 */
export interface SchemasWayCollectionPlainResponse {
    /**
     * 
     * @type {string}
     * @memberof SchemasWayCollectionPlainResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasWayCollectionPlainResponse
     */
    uuid: string;
}

/**
 * Check if a given object implements the SchemasWayCollectionPlainResponse interface.
 */
export function instanceOfSchemasWayCollectionPlainResponse(
    value: object
): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "uuid" in value;

    return isInstance;
}

export function SchemasWayCollectionPlainResponseFromJSON(json: any): SchemasWayCollectionPlainResponse {
    return SchemasWayCollectionPlainResponseFromJSONTyped(json, false);
}

export function SchemasWayCollectionPlainResponseFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasWayCollectionPlainResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'uuid': json['uuid'],
    };
}


export function SchemasWayCollectionPlainResponseToJSON(value?: SchemasWayCollectionPlainResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'uuid': value.uuid,
    };
}

