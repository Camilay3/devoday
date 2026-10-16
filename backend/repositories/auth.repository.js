import prisma from '../prisma/client.js';

export function findByEmail(email) {
	return prisma.user.findUnique({ where: { email } });
}

export function create(data) {
	return prisma.user.create({ data, omit: { password: true }, });
}

export function verifyUser(id) {
	return prisma.user.update({
		where: { id },
		data: { 
			emailVerified: true,
			verificationCode: null,
			verificationCodeExpiresAt: null,
		},
		omit: { password: true }
	})
}
