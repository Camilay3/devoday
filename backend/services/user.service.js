import * as userRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import { AppError } from '../utils/app.error.js';

export async function listUsers() {
	return userRepository.getAll();
}

export async function getUser(id) {
	const user = await userRepository.getUser(id);
    if (!user) throw new AppError('Usuário não encontrado', 404);
	return user;
}

export async function createUser(data) {
	const existing = await userRepository.findByEmail(data.email);
	if (existing) throw new AppError('Email já cadastrado', 409);

	const hashedPassword = await bcrypt.hash(data.password, 12);
	return userRepository.create({ ...data, password: hashedPassword });
}

export async function loginUser(data) {
	const existing = await userRepository.findByEmail(data.email);
	if (!existing) throw new AppError('Email ou senha incorretos', 409);

	const valid = await bcrypt.compare(data.password, existing.password);
	if (!valid) throw new AppError("Email ou senha incorretos", 409);

	const safeUser = { ...existing };
	delete safeUser.password;
  	return safeUser;
}

export async function updateUser(data) {
	await getUser(data.id);

	if (data.email) {
        const existing = await userRepository.findByEmail(data.email);
        if (existing && existing.id !== data.id) throw new AppError('Email já cadastrado', 409);
    }

    return userRepository.updateUser(data);
}

export async function deleteUser(id) {
	await getUser(id);
	return userRepository.deleteUser(id);
}
