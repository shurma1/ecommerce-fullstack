import {Model} from 'sequelize';

export interface FileCreationAttributes{
	filename: string;
	alt: string;
}
export interface FileAttributes{
	id: string;
	filename: string;
	alt: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface FileInstance
	extends Model<FileAttributes, FileCreationAttributes>,
		FileAttributes {}