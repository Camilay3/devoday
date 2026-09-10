import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { editUserSchema } from '../validators/user.validator.js';

const router = Router();

router.get('/listar', authenticate, userController.listUsers);
router.get('/:id', authenticate, userController.getUser);
router.patch('/editar/:id', authenticate, validate(editUserSchema), userController.updateUser);
router.delete('/excluir/:id', authenticate, userController.deleteUser);

export default router;
