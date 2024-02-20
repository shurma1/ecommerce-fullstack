import {Model} from 'sequelize';

export interface BannerCreationAttributes{
	dateFrom: Date;
	dateTo: Date;
	title: string;
	description: string;
	backgroundImageId: string;
	contentImageId: string;
}
export interface BannerAttributes{
	id: string;
	dateFrom: Date;
	dateTo: Date;
	title: string;
	description: string;
	backgroundImageId?: string;
	contentImageId?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface BannerInstance
	extends Model<BannerAttributes, BannerCreationAttributes>,
		BannerAttributes {}