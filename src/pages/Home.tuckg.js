import { getAllCollection } from 'backend/web-module.web';
import pako from 'pako';


$w.onReady(function () {
    $w('#button1').onClick(async (event) => {
        const allItemsZip = await getAllCollection(true);
        const unzip = unzipPayload(allItemsZip);
        console.log(`Size of zip in MB: ${getSizeInMB(allItemsZip)}`);
        console.log(`Size of afterUnzip in MB: ${getSizeInMB(unzip)}`);
    });

    $w('#button2').onClick(async (event) => {
        const allItemsUnzip = await getAllCollection(false);
        console.log(`Size of allItemsUnzip in MB: ${getSizeInMB(allItemsUnzip)}`);
    });


});

function unzipPayload(base64) {
    const binaryString = atob(base64);
    const binaryArray = Uint8Array.from(binaryString, char => char.charCodeAt(0));
    const decompressed = pako.ungzip(binaryArray, { to: 'string' });
    return JSON.parse(decompressed);
}

function getSizeInMB(array) {
    const jsonString = JSON.stringify(array);
    const byteSize = new TextEncoder().encode(jsonString).length;
    const mbSize = byteSize / (1024 * 1024);
    return mbSize;
}