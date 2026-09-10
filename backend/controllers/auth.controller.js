import * as authService from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';

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
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	res.status(201).json({ accessToken, user });
});
