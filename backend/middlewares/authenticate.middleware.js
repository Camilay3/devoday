import jwt from 'jsonwebtoken';

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
