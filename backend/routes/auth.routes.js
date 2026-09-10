import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createUserSchema, loginUserSchema } from '../validators/auth.validator.js';

const router = Router();

router.post('/login', validate(loginUserSchema), authController.login);
router.post('/cadastro', validate(createUserSchema), authController.register);

export default router;
