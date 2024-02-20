import {Model} from 'sequelize';

export interface TokenCreationAttributes{
	token: string;
	ip: string;
	browser: string;
}
export interface TokenAttributes{
	id: string;
	token: string;
	ip: string;
	browser: string;
	userId?: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface TokenInstance
	extends Model<TokenAttributes, TokenCreationAttributes>,
		TokenAttributes {}