import {Model} from 'sequelize';

export interface PermissionToUserCreationAttributes{
	roleId: string;
	permissionId: string;
}
export interface PermissionToUserAttributes{
	id: string;
	roleId?: string;
	permissionId?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface PermissionToUserInstance
	extends Model<PermissionToUserAttributes, PermissionToUserCreationAttributes>,
		PermissionToUserAttributes {}