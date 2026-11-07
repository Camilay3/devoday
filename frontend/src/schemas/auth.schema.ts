import { z } from 'zod';

export const cadastroSchema = z
	.object({
		name: z.string().trim().min(3, 'Nome precisa ter no mínimo 3 caracteres').regex(/^\p{L}+(?:[ '\u2019-]\p{L}+)*$/u, 'Nome contém caracteres inválidos'),
		email: z.string().trim().toLowerCase().email('Email inválido'),
		password: z.string().min(8, 'Senha precisa ter no mínimo 8 caracteres').refine((value) => value.trim().length > 0, 'Senha não pode conter apenas espaços'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	});

export const loginSchema = z
	.object({
		email: z.string().trim().toLowerCase().email('Email inválido'),
		password: z.string().min(8, 'Senha precisa ter no mínimo 8 caracteres').refine((value) => value.trim().length > 0, 'Senha não pode conter apenas espaços'),
	})

export type CadastroFormData = z.infer<typeof cadastroSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
