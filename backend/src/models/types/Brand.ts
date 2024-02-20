import {Model} from 'sequelize';

export interface BrandCreationAttributes{
	name: string;
	image: string;
}
export interface BrandAttributes{
	id: string;
	name: string;
	image: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface BrandInstance
	extends Model<BrandAttributes, BrandCreationAttributes>,
		BrandAttributes {}