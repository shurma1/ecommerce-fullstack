import {Model} from 'sequelize';

export interface TypeCreationAttributes{
	name: string;
	image: string;
}
export interface TypeAttributes{
	id: string;
	name: string;
	image: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface TypeInstance
	extends Model<TypeAttributes, TypeCreationAttributes>,
		TypeAttributes {}