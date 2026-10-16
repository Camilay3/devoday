import bcrypt from 'bcrypt';
import { randomInt } from 'node:crypto';
import * as authRepository from '../repositories/auth.repository.js';
import { AppError } from '../utils/app.error.js';
import { sendVerificationEmail } from '../services/email.service.js';
import { getUser } from './user.service.js';

export async function register(data) {
	const existing = await authRepository.findByEmail(data.email);
	if (existing) throw new AppError('Email já cadastrado', 409);

	const hashedPassword = await bcrypt.hash(data.password, 12);
	const code = randomInt(100000, 1000000).toString();

	const user = await authRepository.create({ ...data, 
		password: hashedPassword,
		emailVerified: false,
        verificationCode: code,
        verificationCodeExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
	});
	
	try {
        await sendVerificationEmail(user.email, code);

    } catch (error) {
        console.error('Erro ao enviar código:', error);
        throw new AppError('Não foi possível enviar o código de confirmação. Tente novamente.', 500);
    }

    return user;
}

export async function verifyUser(email, code) {
	const user = await authRepository.findByEmail(email);

	if (user.emailVerified) throw new AppError('Usuário já verificado', 409);
	if (code !== user.verificationCode) throw new AppError('Código incorreto', 400);
	if (!user.verificationCodeExpiresAt || user.verificationCodeExpiresAt < new Date()) throw new AppError('Código expirado', 400);

	return authRepository.verifyUser(email);
}

export async function login(data) {
	const existing = await authRepository.findByEmail(data.email);
	if (!existing) throw new AppError('Email ou senha incorretos, verifique novamente.', 409);

	const valid = await bcrypt.compare(data.password, existing.password);
	if (!valid) throw new AppError('Email ou senha incorretos, verifique novamente.', 409);

	if (!existing.emailVerified) throw new AppError('Email não verificado', 409);
	// trocar erro por modal de verificação

	const safeUser = { ...existing };
	delete safeUser.password;
	return safeUser;
}
