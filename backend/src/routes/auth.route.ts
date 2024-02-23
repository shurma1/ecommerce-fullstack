import express from 'express';
import {AuthController} from '../controllers';
import {validateSchema} from '../middleware/validateSchema.middleware';
import {signupSchema} from '../schemas/signup.schema';
import {signinSchema} from '../schemas/signin.schema';

const router = express.Router();

router.post('/signUp', validateSchema(signupSchema()), AuthController.signUp);
router.post('/signIn', validateSchema(signinSchema()), AuthController.signIn);
export default router;