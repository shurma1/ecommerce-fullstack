import {Model} from 'sequelize';

export interface TypeCreationAttributes{
	name: string;
	imageId: string;
}
export interface TypeAttributes{
	id: string;
	name: string;
	imageId?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface TypeInstance
	extends Model<TypeAttributes, TypeCreationAttributes>,
		TypeAttributes {}