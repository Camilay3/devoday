import * as userRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import { AppError } from '../utils/app.error.js';

export async function listUsers() {
	return userRepository.getAll();
}

export async function getUser(data) {
	return userRepository.getUser(data.id);
}

export async function createUser(data) {
	const existing = await userRepository.findByEmail(data.email);
	if (existing) throw new AppError('Email já cadastrado', 409);

	const hashedPassword = await bcrypt.hash(data.password, 10);
	return userRepository.create({ ...data, password: hashedPassword });
}

export async function updateUser(data) {
	const user = await userRepository.getUser(data.id);
    if (!user) throw new AppError('Usuário não encontrado', 404);

	if (data.email) {
        const existing = await userRepository.findByEmail(data.email);
        if (existing && existing.id !== data.id) throw new AppError('Email já cadastrado', 409);
    }

    return userRepository.updateUser(data);
}
