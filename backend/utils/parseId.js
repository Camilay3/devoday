import { AppError } from './app.error.js';

export function parseId(rawId) {
	const id = Number(rawId);
	if (!Number.isInteger(id) || id <= 0) throw new AppError('ID inválido', 400);
	return id;
}
