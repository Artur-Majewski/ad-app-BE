export interface NewAdEntity extends Omit<AdEntity, 'id'> {
	id?: string;
}

export interface SimpleAdEntity {
	id: string;
	latitude: number;
	longitude: number;
	address: string;
}

export interface AdEntity extends SimpleAdEntity {
	name: string;
	description: string;
	url: string;
	price: number;
}

export interface AdFormEntity {
	name: string;
	description: string;
	url: string;
	price: number;
	address: string;
}