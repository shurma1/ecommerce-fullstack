import {Model} from 'sequelize';

export interface PermissionToRoleCreationAttributes{
	roleId: string;
	permissionId: string;
}
export interface PermissionToRoleAttributes{
	id: string;
	roleId?: string;
	permissionId?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface PermissionToRoleInstance
	extends Model<PermissionToRoleAttributes, PermissionToRoleCreationAttributes>,
		PermissionToRoleAttributes {}