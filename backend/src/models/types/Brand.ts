import {Model} from 'sequelize';

export interface BrandCreationAttributes{
	name: string;
	imageId: string;
}
export interface BrandAttributes{
	id: string;
	name: string;
	imageId?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface BrandInstance
	extends Model<BrandAttributes, BrandCreationAttributes>,
		BrandAttributes {}