import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate, authorizeSelf } from '../middlewares/authenticate.middleware.js';
import { editUserSchema, userIdParamSchema } from '../validators/user.validator.js';

const router = Router();

router.get('/:id', authenticate, validate(userIdParamSchema, 'params'), authorizeSelf, userController.getUser);
router.patch('/editar/:id', authenticate, validate(userIdParamSchema, 'params'), authorizeSelf, validate(editUserSchema), userController.updateUser);
router.delete('/excluir/:id', authenticate, validate(userIdParamSchema, 'params'), authorizeSelf, userController.deleteUser);

export default router;
