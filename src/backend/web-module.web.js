import { Permissions, webMethod } from "wix-web-module";
import * as DataMethods from 'backend/data-methods.js';

import { gzip } from 'zlib';
import { promisify } from 'util';

const gzipAsync = promisify(gzip);
const callAndZip = async (method, ...args) => zipPayload(await method(...args));

async function zipPayload(jsonObject) {
    const jsonString = JSON.stringify(jsonObject);
    try {
        // @ts-ignore
        const compressedBuffer = await gzipAsync(Buffer.from(jsonString));
        // @ts-ignore
        return compressedBuffer.toString('base64');
    } catch (err) {
        throw new Error(`Error in zipPayload: ${err.message}`);
    }
}

export const queryCollection = webMethod(Permissions.Anyone, (zip) => zip ? callAndZip(DataMethods.queryCollection) : DataMethods.queryCollection());