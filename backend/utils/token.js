import jwt from 'jsonwebtoken';

export function generateAccessToken(userId) {
	return jwt.sign(
		{ userId },
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: '15m' }
	);
}

export function generateRefreshToken(userId) {
	return jwt.sign(
		{ userId },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: '7d' }
	);
}
