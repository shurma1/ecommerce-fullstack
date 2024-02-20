import {Model} from 'sequelize';

export interface ProductToOrderCreationAttributes{
	count: number;
	productId: string;
	orderId: string;
	price: number;
	oldPrice: number;

}
export interface ProductToOrderAttributes{
	id: string;
	count: number;
	productId?: string;
	orderId?: string;
	price: number;
	oldPrice: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ProductToOrderInstance
	extends Model<ProductToOrderAttributes, ProductToOrderCreationAttributes>,
		ProductToOrderAttributes {}