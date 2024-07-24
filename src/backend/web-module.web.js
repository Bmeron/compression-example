import { Permissions, webMethod } from "wix-web-module";
import {getAllCollection} from './data-methods.js';

import { gzip } from 'zlib';
import { promisify } from 'util';

const gzipAsync = promisify(gzip);
const callAndZip = async (method, ...args) => zipPayload(await method(...args));

async function zipPayload(jsonObject) {
    const jsonString = JSON.stringify(jsonObject);
    try {
        const compressedBuffer = await gzipAsync(Buffer.from(jsonString));
        return compressedBuffer.toString('base64');
    } catch (err) {
        throw new Error(`Error in zipPayload: ${err.message}`);
    }
}


export const getLatestPosts = webMethod(Permissions.Anyone, (currentPostId) => callAndZip(getAllCollection, currentPostId));