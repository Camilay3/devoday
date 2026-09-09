import { ZodError } from 'zod';

export function errorMiddleware(err, req, res, next) {
    console.error(err);

    if (err instanceof ZodError) return res.status(400).json({ errors: err.issues });
	if (err.message === 'Email já cadastrado') return res.status(409).json({ error: err.message });
	if (err.status) return res.status(err.status).json({ error: err.message });

    return res.status(500).json({ error: 'Erro interno' });
}
