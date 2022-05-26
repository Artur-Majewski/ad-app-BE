export interface NewAdEntity extends Omit<AdEntity, 'id'> {
	id?: string;
}

export interface SimpleAdEntity {
	id: string;
	latitude: number;
	longitude: number;
}

export interface AdEntity extends SimpleAdEntity {
	name: string;
	description: string;
	price: number;
	url: string;
}