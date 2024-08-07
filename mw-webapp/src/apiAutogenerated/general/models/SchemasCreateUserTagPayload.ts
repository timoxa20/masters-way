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
 * @interface SchemasCreateUserTagPayload
 */
export interface SchemasCreateUserTagPayload {
    /**
     * 
     * @type {string}
     * @memberof SchemasCreateUserTagPayload
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasCreateUserTagPayload
     */
    ownerUuid: string;
}

/**
 * Check if a given object implements the SchemasCreateUserTagPayload interface.
 */
export function instanceOfSchemasCreateUserTagPayload(
    value: object
): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "ownerUuid" in value;

    return isInstance;
}

export function SchemasCreateUserTagPayloadFromJSON(json: any): SchemasCreateUserTagPayload {
    return SchemasCreateUserTagPayloadFromJSONTyped(json, false);
}

export function SchemasCreateUserTagPayloadFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasCreateUserTagPayload {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'ownerUuid': json['ownerUuid'],
    };
}


export function SchemasCreateUserTagPayloadToJSON(value?: SchemasCreateUserTagPayload | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'ownerUuid': value.ownerUuid,
    };
}

