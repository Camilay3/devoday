import * as userService from '../services/user.service.js';

export async function createUser(req, res, next) {
	try {
		const user = await userService.createUser(req.body);
		res.status(201).json(user);
	} catch (err) {
		next(err);
	}
}
