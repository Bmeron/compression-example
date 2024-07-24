import wixData from 'wix-data';

export async function queryCollection() {
    const query = wixData.query('LargeMockData');
    return (await query.find()).items;
}
