import {Model} from 'sequelize';

export interface PermissionCreationAttributes{
	type: string;
	userId: string
}
export interface PermissionAttributes{
	id: string;
	type: string;
	userId?: string
	createdAt?: Date;
	updatedAt?: Date;
}

export interface PermissionInstance
	extends Model<PermissionAttributes, PermissionCreationAttributes>,
		PermissionAttributes {}