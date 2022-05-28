import { FieldPacket } from 'mysql2';
import { type } from 'os';
import { AdEntity, AdFormEntity, NewAdEntity, SignleAdElement, SimpleAdEntity } from '../types';
import { pool } from '../utils/db';
import { ValidationError } from '../utils/error';
import { v4 as uuid } from 'uuid';

type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
	public id: string;
	public name: string;
	public description: string;
	public url: string;
	public price: number;
	public latitude: number;
	public longitude: number;
	public address: string;

	constructor(obj: NewAdEntity) {
		if (!obj.name || obj.name.length > 100 || typeof obj.name != 'string') {
			throw new ValidationError(
				'The name must not be empty and must not be longer than 100 characters. The name must be of string type.'
			);
		}
		if (obj.description.length > 1000 || typeof obj.description != 'string') {
			throw new ValidationError(
				'The description must not be longer than 1000 characters. The description must be of string type.'
			);
		}
		if (obj.url.length > 200 || typeof obj.url != 'string') {
			throw new ValidationError(
				'The URL must not be longer than 200 characters. The URL must be of string type.'
			);
		}
		if (obj.price < 0 || obj.price > 9999999 || typeof obj.price != 'number') {
			throw new ValidationError(
				'The price may not be less than 0 and more than 9 999 999. The price must be of number type.'
			);
		}
		if (typeof obj.latitude != 'number' || typeof obj.longitude != 'number') {
			throw new ValidationError('Location cannot be found.');
		}
		if (obj.address.length > 165 || typeof obj.address != 'string') {
			throw new ValidationError(
				'The address must not be longer than 165 characters. The URL must be of string type.'
			);
		}

		this.id = obj.id;
		this.name = obj.name;
		this.description = obj.description;
		this.url = obj.url;
		this.price = obj.price;
		this.latitude = obj.latitude;
		this.longitude = obj.longitude;
		this.address = obj.address;
	}

	static async getOne(id: string): Promise<AdRecord | null> {
		const [results] = (await pool.execute(
			'SELECT * FROM `ads` WHERE id = :id',
			{
				id,
			}
		)) as AdRecordResults;

		return results.length === 0 ? null : new AdRecord(results[0]);
	}

	static async findAll(name: string): Promise<SimpleAdEntity[]> {
		const [results] = (await pool.execute(
			'SELECT * FROM `ads` WHERE name LIKE :search',
			{
				search: `%${name}%`,
			}
		)) as AdRecordResults;

		return results.map((ad) => {
			const { id, latitude, longitude } = ad;
			return { id, latitude, longitude };
		});
	}

	static async findGeoLoc(lat: number, lot: number): Promise<SimpleAdEntity[]> {
		const [results] = (await pool.execute(
			'SELECT * FROM `ads` WHERE latitude BETWEEN :latitude - 0.1 AND :latitude + 0.1 AND longitude BETWEEN :longitude - 0.1 AND :longitude + 0.1',
			{
				latitude: lat,
				longitude: lot,
			}
		)) as AdRecordResults;

		return results.map((ad) => {
			const { id, latitude, longitude } = ad;
			return { id, latitude, longitude };
		});
	}

	static async findAllLocalAds(lat: number, lot: number): Promise<SignleAdElement[] | null> {
		const [results] = (await pool.execute(
			'SELECT * FROM `ads` WHERE latitude BETWEEN :latitude - 0.1 AND :latitude + 0.1 AND longitude BETWEEN :longitude - 0.1 AND :longitude + 0.1',
			{
				latitude: lat,
				longitude: lot,
			}
		)) as AdRecordResults;

		return results.length === 0 ? null : results.map(ad => new AdRecord(ad) )
	}

	async insert(): Promise<void> {
		if (!this.id) {
			this.id = uuid();
		} else {
			throw new Error('Cannot insert object that is already inserted');
		}
		await pool.execute(
			'INSERT INTO `ads`(`id`, `name`, `description`, `url`, `price`, `latitude`, `longitude`, `address`) VALUES(:id, :name, :description, :url, :price, :latitude, :longitude, :address)',
			this
		);
	}
}
