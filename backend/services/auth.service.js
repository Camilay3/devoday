import bcrypt from 'bcrypt';
import * as authRepository from '../repositories/auth.repository.js';
import { AppError } from '../utils/app.error.js';

export async function register(data) {
	const existing = await authRepository.findByEmail(data.email);
	if (existing) throw new AppError('Email já cadastrado', 409);

	const hashedPassword = await bcrypt.hash(data.password, 12);
	return authRepository.create({ ...data, password: hashedPassword });
}

export async function login(data) {
	const existing = await authRepository.findByEmail(data.email);
	if (!existing) throw new AppError('Email ou senha incorretos', 409);

	const valid = await bcrypt.compare(data.password, existing.password);
	if (!valid) throw new AppError('Email ou senha incorretos', 409);

	const safeUser = { ...existing };
	delete safeUser.password;
	return safeUser;
}
