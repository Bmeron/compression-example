import { queryCollection } from 'backend/web-module.web';
import pako from 'pako';


$w.onReady(function () {
    $w('#getUnzipButton').onClick(async (event) => {
        const allItemsUnZip = await queryCollection(false);
        $w('#getUnzipText').text = `Size of all Items Unzip in MB: ${getSizeInMB(allItemsUnZip)}`;
        console.log(allItemsUnZip);
    });

    $w('#getZipButton').onClick(async (event) => {
        const allItemsZip = await queryCollection(true);
        $w('#getZipText').text = `Size of all Items zip in MB: ${getSizeInMB(allItemsZip)}`;
        const unzipData = unzipPayload(allItemsZip);
        console.log(unzipData);
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