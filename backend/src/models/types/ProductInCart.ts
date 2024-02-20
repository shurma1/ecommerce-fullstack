import {Model} from 'sequelize';

export interface ProductInCartCreationAttributes{
	userId: string;
	productsToMarketId: string;
}
export interface ProductInCartAttributes{
	id: string;
	count: number;
	userId?: string;
	productsToMarketId?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ProductInCartInstance
	extends Model<ProductInCartAttributes, ProductInCartCreationAttributes>,
		ProductInCartAttributes {}