import { z } from 'zod';

export const cadastroSchema = z
	.object({
		name: z.string().min(3, 'Nome precisa ter no mínimo 3 caracteres'),
		email: z.string().email('Email inválido'),
		password: z.string().min(8, 'Senha precisa ter no mínimo 8 caracteres'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	});

export const loginSchema = z
	.object({
		email: z.string().email('Email inválido'),
		password: z.string().min(8, 'Senha precisa ter no mínimo 8 caracteres'),
	})

export type CadastroFormData = z.infer<typeof cadastroSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
