import { AdRecord } from '../records/ad-record';
import { pool } from '../utils/db';

afterAll(async () => {
	await pool.end();
});

const defaultObj = {
	name: 'Test name',
	description: 'Test description',
	url: 'http://test-url.com',
	price: 0,
	latitude: 1,
	longitude: 1,
	address: 'Warszawa'
};

test('AdRecord.getOne return data from database for single entry', async () => {
	const ad = await AdRecord.getOne('test');

	expect(ad).toBeDefined();
	expect(ad.id).toBe('Test');
	expect(ad.name).toBe('Test');
	expect(ad.description).toBe('Test description');
});

test('AdRecord.getOne return null from database for unexisting entry', async () => {
	const ad = await AdRecord.getOne('fail');

	expect(ad).toBeNull();
});

test('AdRecord.getAll return array of found elements from database', async () => {
	const ads = await AdRecord.findAll('');

	expect(ads).not.toEqual([]);
	expect(ads[0]).toBeDefined();
});

test('AdRecord.getAll return an array of found elements from the database when the elements have "t" ', async () => {
	const ads = await AdRecord.findAll('t');

	expect(ads).not.toEqual([]);
	expect(ads[0]).toBeDefined();
});

test("AdRecord.getAll return an empty array when the search didn't find any element   ", async () => {
	const ads = await AdRecord.findAll('a!@#$%^&*()');

	expect(ads).toEqual([]);
});

test('AdRecord.getAll return small amount of data', async () => {
	const ads = await AdRecord.findAll('');
	// @ts-ignore
	expect(ads[0].price).toBeUndefined();
	// @ts-ignore
	expect(ads[0].description).toBeUndefined();
});



test('AdREcord.isert return new UUID', async () => {
	const ad = new AdRecord(defaultObj);

	await ad.insert();

	expect(ad.id).toBeDefined();
	expect(typeof ad.id).toBe('string');
});

test('AdREcord.isert insert data to database', async () => {
	const ad = new AdRecord(defaultObj);
	await ad.insert();

	const foundAd = await AdRecord.getOne(ad.id);

	expect(foundAd).toBeDefined();
	expect(foundAd).not.toBeNull();
	expect(foundAd.id).toBe(ad.id);
});
