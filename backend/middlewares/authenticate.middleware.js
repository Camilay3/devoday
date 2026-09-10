import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) return res.status(401).json({ error: 'Token não informado' });

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.status(403).json({ error: 'Token inválido ou expirado' });
		req.userId = decoded.userId;
		next();
	});
}
