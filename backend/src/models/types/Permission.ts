import {Model} from 'sequelize';

export interface PermissionCreationAttributes{
	name: string;
	description: string;
}
export interface PermissionAttributes{
	id: string;
	name: string;
	description: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface PermissionInstance
	extends Model<PermissionAttributes, PermissionCreationAttributes>,
		PermissionAttributes {}