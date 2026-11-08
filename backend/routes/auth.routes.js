import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createUserSchema, loginUserSchema, verifyUserParamSchema } from '../validators/auth.validator.js';
import { emailKey, ipKey, rateLimit } from '../middlewares/rate-limit.middleware.js';

const router = Router();

router.post('/login',
	validate(loginUserSchema),
	rateLimit({ windowMs: 15 * 60 * 1000, max: 5, keyGenerators: [ipKey, emailKey] }),
	authController.login,
);
router.post('/cadastro',
	validate(createUserSchema),
	rateLimit({ windowMs: 60 * 60 * 1000, max: 5, keyGenerators: [ipKey] }),
	rateLimit({ windowMs: 60 * 60 * 1000, max: 2, keyGenerators: [emailKey] }),
	authController.register,
);
router.post('/verificar/:email/:code',
	validate(verifyUserParamSchema, 'params'),
	rateLimit({ windowMs: 10 * 60 * 1000, max: 5, keyGenerators: [ipKey, emailKey] }),
	authController.verify,
);
router.post('/refresh',
	rateLimit({ windowMs: 60 * 1000, max: 30, keyGenerators: [ipKey] }),
	authController.refresh,
);
router.post('/logout',
	rateLimit({ windowMs: 60 * 1000, max: 30, keyGenerators: [ipKey] }),
	authController.logout,
);

export default router;
