import wixData from 'wix-data';

export async function getAllCollection() {
    const query = wixData.query('LargeMockData');
    return (await query.find()).items;
}
