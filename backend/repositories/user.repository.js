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

export function updateUser(data) {
	return prisma.user.update({
		where: { id: data.id },
		data: {
			name: data.name,
			email: data.email
		},
		omit: { password: true }
	})
}

export function deleteUser(id) {
	return prisma.user.delete({ where: { id } });
}
