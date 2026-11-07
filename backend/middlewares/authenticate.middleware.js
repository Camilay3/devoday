import jwt from 'jsonwebtoken';
import { AppError } from '../utils/app.error.js';

export function authenticate(req, res, next) {
	const token = req.headers.authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
	if (!token) return res.status(401).json({ error: 'Token não informado' });

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { algorithms: ['HS256'] });
		if (!decoded || typeof decoded !== 'object' || !Number.isInteger(decoded.userId)) {
			return res.status(401).json({ error: 'Token inválido ou expirado' });
		}

		req.userId = decoded.userId;
		next();
	} catch {
		return res.status(401).json({ error: 'Token inválido ou expirado' });
	}
}

export function authorizeSelf(req, _res, next) {
	const requestedId = Number(req.params.id);
	if (!Number.isInteger(requestedId) || requestedId !== req.userId) {
		return next(new AppError('Você só pode acessar a própria conta', 403));
	}
	next();
}
