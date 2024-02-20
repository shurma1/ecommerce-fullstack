import {Model} from 'sequelize';

export interface MarketCreationAttributes{
	address: string;
	cityId: string;
}
export interface MarketAttributes{
	id: string;
	address: string;
	cityId?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface MarketInstance
	extends Model<MarketAttributes, MarketCreationAttributes>,
		MarketAttributes {}