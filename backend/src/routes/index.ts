import express from 'express';
import AuthRouter from './auth.route';
import FileRouter from './file.route';

const router = express.Router();

router.use('/auth', AuthRouter);

router.use('/file', FileRouter);

export default router;