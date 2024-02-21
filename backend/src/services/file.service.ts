import sharp from 'sharp';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
import {File} from '../models/model';
import {ApiError} from '../error/apiError';
import {UploadedFile} from 'express-fileupload';
import config from 'config';
import * as fs from 'fs';
import validator from 'validator';

const uploadPath = path.resolve(__dirname, '..', '..', 'upload');

class FileService{

	async upload(file: UploadedFile, alt = '') {

		if (! fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath);
		}

		const allowedFileMimeTypes = config.get('file.allow_types') as string[];
		const isAllowedFile = allowedFileMimeTypes.includes(file.mimetype);

		if(! isAllowedFile) {
			throw ApiError.errorByType('FILE_NOT_ALLOWED');
		}

		const filename = uuidv4() + '.webp';
		await sharp(file.data)
			.toFormat('webp')
			.toFile(path.resolve(uploadPath, filename));

		return await File.create({
			filename,
			alt
		});
	}

	async remove(fileId: string) {

		const file = await File.findOne({
			where: {
				id: fileId
			}
		});

		if(! file) {
			throw ApiError.errorByType('FILE_NOT_EXISTS');
		}

		const filePath = path.resolve(uploadPath, file.filename);

		if(fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
		}

		file.destroy();
	}

	async get(fileId: string, size?: string, quality?: string) {

		const file = await File.findOne({
			where: {
				id: fileId
			}
		});

		const filePath = path.resolve(__dirname, '..', 'upload', file.filename);


		if(! file || ! fs.existsSync(filePath)) {
			throw ApiError.errorByType('FILE_NOT_EXISTS');
		}

		const sharpFile = sharp(filePath);

		if(size){
			const [height, width] = size.split('x');
			if(
				! height
				|| !width
				|| !validator.isNumeric(height)
				|| !validator.isNumeric(width)
			) {
				throw ApiError.errorByType('IMAGE_SIZE_INVALID');
			}

			sharpFile.resize(+height, +width);
		}

		if(quality){

			if(
				! validator.isNumeric(quality)
				|| +quality < 0
				|| +quality > 100
			) {
				throw ApiError.errorByType('IMAGE_QUALITY_INVALID');
			}

			sharpFile
				.webp({
					quality: +quality
				});
		}

		const metadata = await sharpFile.metadata();
		const buffer = await sharpFile.toBuffer();
		const length = buffer.length;


		return {
			metadata,
			buffer,
			length
		};
	}

	async getPath(fileId: string){
		const file = await File.findOne({
			where: {
				id: fileId
			}
		});

		const filePath = path.resolve(__dirname, '..', 'upload', file.filename);


		if(! file || ! fs.existsSync(filePath)) {
			throw ApiError.errorByType('FILE_NOT_EXISTS');
		}

		return filePath;
	}

	async getAll(limit?: any, page?: any){

		limit = limit || config.get('default_items_count') as number;
		page = page || 1;

		if(! validator.isNumeric(String(limit)) || ! validator.isNumeric(String(page))) {
			throw ApiError.errorByType('PARAMS_INVALID');
		}

		page = +page;
		limit = +limit;

		const offset = page  * limit - limit;

		return await File.findAndCountAll({
			limit,
			offset,
			attributes: ['id', 'alt', 'createdAt']
		});
	}
}

export default new FileService();