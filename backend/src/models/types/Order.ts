import {Model} from 'sequelize';

export interface OrderCreationAttributes{
	userId: string;
}
export interface OrderAttributes{
	id: string;
	status: string;
	userId?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface OrderInstance
	extends Model<OrderAttributes, OrderCreationAttributes>,
		OrderAttributes {}