import {NextFunction, Request, Response} from 'express';
import {ApiError} from '../error/apiError';
import {FileService} from '../services';
import {UploadedFile} from 'express-fileupload';

class FileController {
	async upload (req: Request, res: Response, next: NextFunction) {
		try{
			if(!req.files) {
				throw ApiError.errorByType('FILE_EMPTY');
			}

			const fileNames = Object.keys(req.files);

			if(fileNames.length !== 1) {
				throw ApiError.errorByType('LOAD_MULTIPLY_FILES_FORBIDDEN');
			}

			const file = req.files[fileNames[0]] as UploadedFile;

			const loadedFile = await FileService.upload(file, req.body.alt);

			res.json({
				success: true,
				data: {
					fileId: loadedFile.id,
					alt: loadedFile.alt
				}
			});


		}
		catch (e){
			next(e);
		}
	}

	async get (req: Request, res: Response, next: NextFunction) {
		try{
			const fileId = req.params.id;
			const size = req.query.size as string;
			const quality: string = req.query.quality as string;

			if(! fileId) {
				throw ApiError.errorByType('FILE_ID_NOT_EXISTS');
			}

			if(!size && !quality) {
				const path = await FileService.getPath(fileId);
				res.sendFile(path);
				return;
			}

			const file = await FileService.get(fileId, size, quality);

			res.writeHead(200, {
				'Content-Type': String(file.metadata),
				'Content-Length': String(file.length)
			});
			res.end(file.buffer);

		}
		catch (e) {
			next(e);
		}
	}

	async remove(req: Request, res: Response, next: NextFunction){
		try{
			const fileId = req.params.id;

			if(! fileId) {
				throw ApiError.errorByType('FILE_ID_NOT_EXISTS');
			}

			await FileService.remove(fileId);

			res.json({
				status: true,
			});

		}
		catch (e){
			next(e);
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction){
		try{
			const {limit, page} = req.query;

			const files = await FileService.getAll(limit, page);

			res.json({
				status: true,
				data: files
			});

		}
		catch (e){
			next(e);
		}
	}
}

export default new FileController();