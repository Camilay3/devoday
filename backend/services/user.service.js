import * as userRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';

export async function listUsers() {
	return userRepository.getAll();
}

export async function createUser(data) {
	const existing = await userRepository.findByEmail(data.email);
	if (existing) throw new Error('Email já cadastrado');

	const hashedPassword = await bcrypt.hash(data.password, 10);
	return userRepository.create({ ...data, password: hashedPassword });
}
