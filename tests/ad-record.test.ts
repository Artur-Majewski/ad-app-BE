import { AdRecord } from '../records/ad-record';

const defaultObj = {
	name: 'Test name',
	description: 'Test description',
	url: 'http://test-url.com',
	price: 0,
	latitude: 1,
	longitude: 1,
	address: 'Warszawa'
};

const text1000Character = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.a"

test('Can AdRecord be built', () => {
	const ad = new AdRecord(defaultObj);

	expect(ad.name).toBe('Test name');
	expect(ad.description).toBe('Test description');
	expect(ad.url).toBe('http://test-url.com');
	expect(ad.price).toBe(0);
	expect(ad.latitude).toBe(1);
	expect(ad.longitude).toBe(1);
});

test('Validate correct type of name', () => {
	const ad = new AdRecord(defaultObj);
	expect(typeof ad.name).toBe('string');
	expect(typeof ad.description).toBe('string');
	expect(typeof ad.url).toBe('string');
	expect(typeof ad.price).toBe('number');
	expect(typeof ad.latitude).toBe('number');
	expect(typeof ad.longitude).toBe('number');
});

test('Validates invalid name (is more then 100)', () => {
	expect(() => new AdRecord({ ...defaultObj, name: '' })).toThrow(
		'The name must not be empty and must not be longer than 100 characters. The name must be of string type.'
	);
});

test('Validates invalid name (is more then 100)', () => {
	expect(() => new AdRecord({ ...defaultObj, name: text1000Character })).toThrow(
		'The name must not be empty and must not be longer than 100 characters. The name must be of string type.'
	);
});

test('Validates invalid name field type (differnt then "string")', () => {
	expect(
		() =>
			new AdRecord({
				...defaultObj,
				// @ts-ignore
				name: 1,
			})
	).toThrow(
		'The name must not be empty and must not be longer than 100 characters. The name must be of string type.'
	);
});

test('Validates invalid description (is more then 1000)', () => {
	expect(() => new AdRecord({ ...defaultObj, description: text1000Character })).toThrow(
		'The description must not be longer than 1000 characters. The description must be of string type.'
	);
});

test('Validates invalid description field type (differnt then "boolean")', () => {
	expect(
		() =>
			new AdRecord({
				...defaultObj,
				// @ts-ignore
				description: true,
			})
	).toThrow(
		'The description must not be longer than 1000 characters. The description must be of string type.'
	);
});

test('Validates invalid url (is more then 200)', () => {
	expect(() => new AdRecord({ ...defaultObj, url: text1000Character })).toThrow(
		'The URL must not be longer than 200 characters. The URL must be of string type.'
	);
});

test('Validates invalid url field type (differnt then "boolean")', () => {
	expect(
		() =>
			new AdRecord({
				...defaultObj,
				// @ts-ignore
				url: 112,
			})
	).toThrow(
		'The URL must not be longer than 200 characters. The URL must be of string type.'
	);
});

test('Validates invalid price (is less then 0)', () => {
	expect(() => new AdRecord({ ...defaultObj, price: -1 })).toThrow(
		'The price may not be less than 0 and more than 9 999 999. The price must be of number type.'
	);
});

test('Validates invalid price (is more then 9 999 999)', () => {
	expect(() => new AdRecord({ ...defaultObj, price: 10000000 })).toThrow(
		'The price may not be less than 0 and more than 9 999 999. The price must be of number type.'
	);
});

test('Validates invalid price field type (differnt then "string")', () => {
	expect(
		() =>
			new AdRecord({
				...defaultObj,
				// @ts-ignore
				price: 'string',
			})
	).toThrow(
		'The price may not be less than 0 and more than 9 999 999. The price must be of number type.'
	);
});

test('Validates invalid latitude', () => {
	expect(
		() =>
			new AdRecord({
				...defaultObj,
				// @ts-ignore
				latitude: 'string',
			})
	).toThrow('Location cannot be found.');
});

test('Validates invalid longitude', () => {
	expect(
		() =>
			new AdRecord({
				...defaultObj,
				// @ts-ignore
				longitude: 'string',
			})
	).toThrow('Location cannot be found.');
});
