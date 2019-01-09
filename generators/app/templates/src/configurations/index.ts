import * as nconf from "nconf";
import * as joi from "joi";
import * as path from "path";
import * as fs from "fs";

if (process.env["NODE_ENV"] !== "production" && process.env["NODE_ENV"] !== "staging") {
    const dotEnvLocalPath = path.resolve(`./.env.${process.env["NODE_ENV"]}.local`);
    const dotEnvPath = path.resolve(`./.env.${process.env["NODE_ENV"]}`);

    if (fs.existsSync(dotEnvLocalPath)) {
        console.log("loading " + dotEnvLocalPath.toString());
        const result = require('dotenv').config({path: dotEnvLocalPath});
        if (result.error) {
            throw result.error;
        }
    }

    if (fs.existsSync(dotEnvPath)) {
        console.log("loading " + dotEnvPath.toString());
        const result = require('dotenv').config({path: dotEnvPath});
        if (result.error) {
            throw result.error;
        }
    }
}

// Global configuration schema - JOI validation
const schema = joi.object().keys({
    // TODO: insert joi validation keys
    // eg. NAME__SUBNAME__CONF: joi.string(),
});

// Validate configuration
const result = schema.validate(process.env, {stripUnknown: true});
if (result.error) {
    throw new Error(`Invalid configuration detected: ${result.error}`);
}

// Read configuration
nconf.env({
    separator: "__",
    lowerCase: true,
    parseValues: true
});

// TODO: Define configuration object type
// eg.
// export interface S3StoreConfiguration {
//     bucket: string;
// }
//
// export interface IBMStoreConfiguration {
//     bucket: string;
// }
//
// export interface AzureStoreConfiguration {
//     container: string;
// }
//
// export interface ObjectStoreConfiguration {
//     s3store: S3StoreConfiguration;
//     ibmstore: IBMStoreConfiguration;
//     azurestore: AzureStoreConfiguration;
//     default: string;
// }

// TODO: export get configuration methods
// eg.
// export function getObjectStores(): ObjectStoreConfiguration {
//     return nconf.get("objectstores");
// }
