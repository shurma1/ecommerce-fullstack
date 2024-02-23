import {Model} from 'sequelize';

export interface ProductCreationAttributes{
	name: string;
	description?: string;
	imageId: string;
	weight: number;
	height: number;
	length: number;
	width: number;
	price: number;
	old_price?: number;
}
export interface ProductAttributes{
	id: string;
	name: string;
	description?: string;
	imageId?: string;
	weight: number;
	height: number;
	length: number;
	width: number;
	price: number;
	old_price?: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ProductInstance
	extends Model<ProductAttributes, ProductCreationAttributes>,
		ProductAttributes {}