import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createUserSchema } from '../validators/user.validator.js';

const router = Router();

router.get('/listar', userController.listUsers);
router.get('/:id', userController.getUser);
router.post('/cadastro', validate(createUserSchema), userController.createUser);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

export default router;
