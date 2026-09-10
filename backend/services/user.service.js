import * as userRepository from '../repositories/user.repository.js';
import * as authRepository from '../repositories/auth.repository.js';
import { AppError } from '../utils/app.error.js';

export async function listUsers() {
	return userRepository.getAll();
}

export async function getUser(id) {
	const user = await userRepository.getUser(id);
    if (!user) throw new AppError('Usuário não encontrado', 404);
	return user;
}

export async function updateUser(data) {
	await getUser(data.id);

	if (data.email) {
        const existing = await authRepository.findByEmail(data.email);
        if (existing && existing.id !== data.id) throw new AppError('Email já cadastrado', 409);
    }

    return userRepository.updateUser(data);
}

export async function deleteUser(id) {
	await getUser(id);
	return userRepository.deleteUser(id);
}
