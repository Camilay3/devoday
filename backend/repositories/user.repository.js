import prisma from '../prisma/client.js';

export function create(data) {
	return prisma.user.create({ data });
}

export function findByEmail(email) {
	return prisma.user.findUnique({ where: { email } });
}
