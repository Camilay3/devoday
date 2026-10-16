import prisma from '../prisma/client.js';

export function findByEmail(email) {
	return prisma.user.findUnique({ where: { email } });
}

export function create(data) {
	return prisma.user.create({ data, omit: { password: true }, });
}

export function verifyUser(email) {
	return prisma.user.update({
		where: { email },
		data: { 
			emailVerified: true,
			verificationCode: null,
			verificationCodeExpiresAt: null,
		},
		omit: { password: true }
	})
}
