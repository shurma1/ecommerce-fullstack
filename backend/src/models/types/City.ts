import {Model} from 'sequelize';

export interface CityCreationAttributes{
	name: string;
}
export interface CityAttributes{
	id: string;
	name: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface CityInstance
	extends Model<CityAttributes, CityCreationAttributes>,
		CityAttributes {}