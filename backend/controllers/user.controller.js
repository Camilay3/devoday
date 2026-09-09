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

export async function createUser(req, res, next) {
	try {
		const user = await userService.createUser(req.body);
		res.status(201).json(user);

	} catch (err) { next(err) }
}
