import * as userService from '../services/user.service.js';

export async function listUsers(req, res, next) {
	try {
		const lista = await userService.listUsers();
		res.status(200).json({
			totalElements: lista.length,
			data: lista,
		});

	} catch (err) { next(err) }
}

export async function getUser(req, res, next) {
	try {
		const id = Number(req.params.id);
		if (!Number.isInteger(id) || id <= 0) {
			const error = new Error('ID inválido');
			error.status = 400;
			return next(error);
		}

		const user = await userService.getUser({ id });
		if (!user) {
			const error = new Error('Usuário não encontrado');
			error.status = 404;
			return next(error);
		}

		res.status(200).json(user);

	} catch (err) { next(err) }
}

export async function createUser(req, res, next) {
	try {
		const user = await userService.createUser(req.body);
		res.status(201).json(user);

	} catch (err) { next(err) }
}
