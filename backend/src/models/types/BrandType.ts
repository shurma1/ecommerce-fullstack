import {Model} from 'sequelize';

export interface BrandTypeCreationAttributes{
	brandId: string;
	typeId: string;
}
export interface BrandTypeAttributes{
	id: string;
	brandId?: string;
	typeId?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface BrandTypeInstance
	extends Model<BrandTypeAttributes, BrandTypeCreationAttributes>,
		BrandTypeAttributes {}