import {Model} from 'sequelize';

export interface UserCreationAttributes{
	name: string;
	email: string;
	password: string;
}
export interface UserAttributes{
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface UserInstance
	extends Model<UserAttributes, UserCreationAttributes>,
		UserAttributes {}