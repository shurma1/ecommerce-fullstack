import express from 'express';
import {FileController} from '../controllers';
import {permissionMiddleware} from '../middleware/permission.middleware';

const router = express.Router();

router.post('/upload', FileController.upload);
router.get('/:id', FileController.get);
router.get('/', permissionMiddleware('GET_IMAGE_LIST'), FileController.getAll);
router.delete('/:id', FileController.remove);

export default router;