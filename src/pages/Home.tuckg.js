import { queryCollection } from 'backend/web-module.web';
import pako from 'pako';

// Initialize event listeners when the page is ready
$w.onReady(() => {
    setupEventListeners();
});

function setupEventListeners() {
    // Handle click event for unzip button
    $w('#getUnzipButton').onClick(handleUnzipClick);

    // Handle click event for zip button
    $w('#getZipButton').onClick(handleZipClick);
}

async function handleUnzipClick(event) {
    const allItemsUnZip = await queryCollection(false);
    displaySize('#getUnzipText', allItemsUnZip);
}

async function handleZipClick(event) {
    const allItemsZip = await queryCollection(true);
    displaySize('#getZipText', allItemsZip);
    const unzipData = unzipPayload(allItemsZip);
    console.log(unzipData);
}

// Display the size of items in MB
function displaySize(selector, items) {
    $w(selector).text = `Size of all Items in MB: ${getSizeInMB(items)}`;
    console.log(items);
}

// Unzip a base64 encoded string
function unzipPayload(base64) {
    const binaryString = atob(base64);
    const binaryArray = Uint8Array.from(binaryString, char => char.charCodeAt(0));
    const decompressed = pako.ungzip(binaryArray, { to: 'string' });
    return JSON.parse(decompressed);
}

// Calculate the size of an array in MB
function getSizeInMB(array) {
    const jsonString = JSON.stringify(array);
    const byteSize = new TextEncoder().encode(jsonString).length;
    return byteSize / (1024 * 1024);
}