import {NextFunction, Request, Response} from 'express';
import {ApiError} from '../error/apiError';
import {FileService} from '../services';
import {UploadedFile} from 'express-fileupload';


/**
 * @swagger
 * components:
 *   schemas:
 *     File:
 *       type: object
 *       properties:
 *         fileId:
 *           type: string
 *           description: User id
 *         alt:
 *           type: string
 *           description: File (Image) alternative view (description)
 *
 *       example:
 *         fileId: b176c757-0779-459e-aea1-d3c97298c2a1
 *         alt: pepsi cola
 */

/**
 * @swagger
 * tags:
 *   name: File
 *   description: File API
 */

class FileController {

	/**
	 * @swagger
	 * /file/upload:
	 *   post:
	 *     summary: Upload file (Image)
	 *     tags: [File]
	 *     parameters:
	 *       - in: formData
	 *         name: file
	 *         schema:
	 *           type: file
	 *         required: true
	 *         description: File binary data
	 *
	 *       - in: formData
	 *         name: alt
	 *         schema:
	 *           type: string
	 *         required: true
	 *         description: alternative view (description)
	 *
	 *     responses:
	 *       200:
	 *         description: OK
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/File'
	 *       400:
	 *         description: |
	 *           FILE_NOT_ALLOWED:
	 *             The file type is not supported.
	 *
	 */

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


	/**
	 * @swagger
	 * /file/{id}:
	 *   get:
	 *     summary: Return file (Image) by fileId
	 *     tags: [File]
	 *     parameters:
	 *       - in: path
	 *         name: size
	 *         schema:
	 *           type: sting
	 *         required: false
	 *         description: Image [height]x[width]
	 *
	 *       - in: path
	 *         name: quality
	 *         schema:
	 *           type: string
	 *         required: false
	 *         description: Image quality form 0 to 100
	 *
	 *     responses:
	 *       200:
	 *         description: Return file (Image)
	 *       400-1:
	 *         description: |
	 *           FILE_NOT_EXISTS:
	 *             The file not exist.
	 *       400-2*:
	 *         description: |
	 *           IMAGE_SIZE_INVALID:
	 *             The file size is specified: [HEIGHT]x[WIDTH], where [HEIGHT] and [WIDTH] are the number of pixels.
	 *       400-3*:
	 *         description: |
	 *           IMAGE_QUALITY_INVALID:
	 *             The quality must be specified from 0 to 100
	 *
	 */

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


	/**
	 * @swagger
	 * /file/{id}:
	 *   delete:
	 *     summary: Remove file by fileId
	 *     tags: [File]
	 *     responses:
	 *       200:
	 *         description: OK
	 *       400:
	 *         description: |
	 *           FILE_NOT_EXISTS:
	 *             The file not exist.
	 *
	 */

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


	/**
	 * @swagger
	 * /file:
	 *   get:
	 *     summary: Return files list
	 *     tags: [File]
	 *     parameters:
	 *       - in: path
	 *         name: limit
	 *         schema:
	 *           type: sting
	 *         required: false
	 *         description: count limit, default - 20
	 *
	 *       - in: path
	 *         name: page
	 *         schema:
	 *           type: string
	 *         required: false
	 *         description: page, default - 1
	 *
	 *     responses:
	 *       200:
	 *         description: Return file (Image)
	 *       400:
	 *         description: |
	 *           PARAMS_INVALID:
	 *             The limit or page is invalid.
	 *
	 *
	 */

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