import * as userService from '../services/user.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { parseId } from '../utils/parseId.js';
import { AppError } from '../utils/app.error.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';

export const listUsers = asyncHandler(async (req, res) => {
	const lista = await userService.listUsers();
	res.status(200).json({
		totalElements: lista.length,
		data: lista,
	});
});

export const getUser = asyncHandler(async (req, res) => {
	const id = parseId(req.params.id);

	const user = await userService.getUser({ id });
	if (!user) throw new AppError('Usuário não encontrado', 404);

	res.status(200).json(user);
});

export const createUser = asyncHandler(async (req, res) => {
	const user = await userService.createUser(req.body);
	res.status(201).json(user);
});

export const loginUser = asyncHandler(async (req, res) => {
	const user = await userService.loginUser(req.body);

	const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 7 * 24 * 60 * 60 * 1000,
    });

	res.status(201).json({accessToken, user});
});

export const updateUser = asyncHandler(async (req, res) => {
	const id = parseId(req.params.id);
	const { name, email } = req.body;

	const updatedUser = await userService.updateUser({ id, name, email });
	res.status(200).json(updatedUser);
});

export const deleteUser = asyncHandler(async (req, res) => {
	const id = parseId(req.params.id);
	await userService.deleteUser(id);
	res.status(200).json({ message: 'Usuário excluído com sucesso' });
});
