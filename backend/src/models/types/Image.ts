import {Model} from 'sequelize';

export interface ImageCreationAttributes{
	filename: string;
	alt: string;
}
export interface ImageAttributes{
	id: string;
	filename: string;
	alt: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ImageInstance
	extends Model<ImageAttributes, ImageCreationAttributes>,
		ImageAttributes {}