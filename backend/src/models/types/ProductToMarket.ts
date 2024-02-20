import {Model} from 'sequelize';

export interface ProductToMarketCreationAttributes{
	count: string;
	marketId: string;
	productId: string;
}
export interface ProductToMarketAttributes{
	id: string;
	count: string;
	marketId?: string;
	productId?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ProductToMarketInstance
	extends Model<ProductToMarketAttributes, ProductToMarketCreationAttributes>,
		ProductToMarketAttributes {}