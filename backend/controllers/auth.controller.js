import * as authService from '../services/auth.service.js';
import * as userService from '../services/user.service.js';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';

function getRefreshToken(req) {
	return req.headers.cookie?.match(/(?:^|;\s*)refreshToken=([^;]*)/)?.[1];
}

export const register = asyncHandler(async (req, res) => {
	const user = await authService.register(req.body);
	res.status(201).json(user);
});

export const login = asyncHandler(async (req, res) => {
	const user = await authService.login(req.body);

	const accessToken = generateAccessToken(user.id);
	const refreshToken = generateRefreshToken(user.id);

	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	res.status(201).json({ accessToken, user });
});

export const refresh = asyncHandler(async (req, res) => {
	const refreshToken = getRefreshToken(req);
	if (!refreshToken) return res.status(401).json({ message: 'Sem sessão ativa' });

	let payload;
	try { 
		payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, { algorithms: ['HS256'] });

	} catch { return res.status(401).json({ message: 'Sessão expirada, faça login novamente' }); }

	if (!payload || typeof payload !== 'object' || !Number.isInteger(payload.userId)) {
		return res.status(401).json({ message: 'Sessão inválida, faça login novamente' });
	}

	let user;
	try {
		user = await userService.getUser(payload.userId);
	} catch (error) {
		if (error.status === 404) return res.status(401).json({ message: 'Sessão inválida, faça login novamente' });
		throw error;
	}

	const newAccessToken = generateAccessToken(user.id);
	res.status(200).json({ accessToken: newAccessToken, user });
});

export const logout = asyncHandler(async (req, res) => {
	res.clearCookie('refreshToken', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
	});
	res.status(200).json({ message: 'Logout realizado' });
});
