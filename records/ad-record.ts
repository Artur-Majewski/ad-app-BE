import { AdEntity } from '../types';
import { ValidationError } from '../utils/error';

interface NewAdEntity extends Omit<AdEntity, 'id'> {
	id?: string;
}

export class AdRecord implements AdEntity {
	public id: string;
	public name: string;
	public description: string;
	public price: number;
	public url: string;
	public latitude: number;
	public longitude: number;

	constructor(obj: NewAdEntity) {
    if (!obj.name || obj.name.length > 100 || typeof obj.name != 'string') {
      throw new ValidationError('The name must not be empty and must not be longer than 100 characters. The name must be of string type.')
    }
    if (obj.description.length > 1000 || typeof obj.description != 'string') {
      throw new ValidationError('The description must not be longer than 1000 characters. The description must be of string type.')
    }
    if (obj.url.length > 200 || typeof obj.url != 'string') {
      throw new ValidationError('The URL must not be longer than 200 characters. The URL must be of string type.')
    }
    if (obj.price < 0 || obj.price > 9999999 || typeof obj.price != 'number') {
      throw new ValidationError('The price may not be less than 0 and more than 9 999 999. The price must be of number type.')
    }
    if (typeof obj.latitude != 'number' || typeof obj.longitude != 'number') {
      throw new ValidationError('Location cannot be found.')
    }

    this.name = obj.name;
    this.description = obj.description;
    this.url = obj.url;
    this.price = obj.price;
    this.latitude = obj.latitude;
    this.longitude = obj.longitude;
  };
}
