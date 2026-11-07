import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { userResponseSchema } from './user.validator.js';

extendZodWithOpenApi(z);

export const tokenResponseSchema = z.object({
	accessToken: z.string().openapi({ example: 'eyJhbGciOiJIUzI1N...' }),
	user: userResponseSchema,
}).openapi('TokenPayload');

export const loginUserSchema = z.object({
	email: z.string().trim().toLowerCase().pipe(z.email({ error: 'Email inválido' })).openapi({ example: 'joao@email.com' }),
	password: z.string().min(8, 'Senha precisa ter no mínimo 8 caracteres').refine((value) => value.trim().length > 0, 'Senha não pode conter apenas espaços').refine((value) => !/[\u0000-\u001F\u007F]/.test(value), 'Senha contém caracteres de controle inválidos').openapi({ example: 'senha123' }),
}).strict().openapi('LoginUsuarioInput');

export const createUserSchema = z.object({
	name: z.string().trim().min(3, 'Nome precisa ter no mínimo 3 caracteres').regex(/^\p{L}+(?:[ '\u2019-]\p{L}+)*$/u, 'Nome contém caracteres inválidos').openapi({ example: 'João' }),
	email: z.string().trim().toLowerCase().pipe(z.email({ error: 'Email inválido' })).openapi({ example: 'joao@email.com' }),
	password: z.string().min(8, 'Senha precisa ter no mínimo 8 caracteres').refine((value) => value.trim().length > 0, 'Senha não pode conter apenas espaços').refine((value) => !/[\u0000-\u001F\u007F]/.test(value), 'Senha contém caracteres de controle inválidos').openapi({ example: 'senha123' }),
}).strict().openapi('CreateUsuarioInput');

export const verifyUserParamSchema = z.object({
	email: z.string().trim().toLowerCase().pipe(z.email()).openapi({
		param: { name: 'email', in: 'path', required: true },
		example: "email@gmail.com",
	}),
	code: z.string().regex(/^\d{6}$/, 'Código deve conter exatamente 6 números').openapi({
		param: { name: 'code', in: 'path', required: true },
		example: '123456',
	}),
}).openapi('VerificarUsuarioParams');
