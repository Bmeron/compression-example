import wixData from 'wix-data';

export async function getAllCollection() {
    const query = wixData.query('LargeMockData');
    const allItems = await retriveAllItems(query, 50);
    console.log(`Size of array in MB: ${getSizeInMB(allItems)}`);
    return allItems;
}

async function retriveAllItems(query, limit) {
    const queryRes = await query.limit(limit).find();
    const queryPromise = [];
    for (let index = 1; index < queryRes.totalPages; index++)
        queryPromise.push(query.skip(limit * index).find());
    const queryPromiseRes = await Promise.all(queryPromise);

    const allItems = queryPromiseRes.map(queryRes => queryRes.items);
 
    
    return [...queryRes.items, ...allItems].flat();
}

export const bulkInsert = (items) =>  wixData.bulkInsert('LargeMockData', items);

export async function duplicateCollection() {
    const allItems = await getAllCollection();
    const toInsert = allItems.map((item) => {
        const { _id, ...rest } = item;
        return rest
    });
    const chunkSize = 50;
    const res = [];
    for (let i = 0; i < toInsert.length; i += chunkSize) {
        const chunk = toInsert.slice(i, i + chunkSize);
        console.log(chunk);
        // bulkInsert(chunk);
    }
    return Promise.all(res);
}

function getSizeInMB(array) {
    const jsonString = JSON.stringify(array);
    const byteSize = new TextEncoder().encode(jsonString).length;
    const mbSize = byteSize / (1024 * 1024);
    return mbSize;
}