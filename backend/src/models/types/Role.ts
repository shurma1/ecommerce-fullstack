import {Model} from 'sequelize';

export interface RoleCreationAttributes{
	name: string;
}
export interface RoleAttributes{
	id: string;
	name: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface RoleInstance
	extends Model<RoleAttributes, RoleCreationAttributes>,
		RoleAttributes {}