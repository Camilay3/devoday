import prisma from '../prisma/client.js';

export function getAll() {
	return prisma.user.findMany({
		omit: { password: true },
	});	
}

export function getUser(id) {
	return prisma.user.findUnique({ 
		where: { id }, 
		omit: { password: true } 
	});
}

export function create(data) {
	return prisma.user.create({ data });
}

export function findByEmail(email) {
	return prisma.user.findUnique({ where: { email } });
}
