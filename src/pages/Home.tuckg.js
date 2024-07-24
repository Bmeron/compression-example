import pako from 'pako';

$w.onReady(function () {
	$w('#button1').onClick((event)=>{
		
	})

});

function unzipPayload(base64) {
    const binaryString = atob(base64);
    const binaryArray = Uint8Array.from(binaryString, char => char.charCodeAt(0));
    const decompressed = pako.ungzip(binaryArray, { to: 'string' });
    return JSON.parse(decompressed);
}