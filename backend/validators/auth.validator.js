import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { userResponseSchema } from './user.validator.js';

extendZodWithOpenApi(z);

export const tokenResponseSchema = z.object({
	accessToken: z.string().openapi({ example: 'eyJhbGciOiJIUzI1N...' }),
	user: userResponseSchema,
}).openapi('TokenPayload');

export const loginUserSchema = z.object({
	email: z.email({ error: 'Email inválido' }).openapi({ example: 'joao@email.com' }),
	password: z.string().min(8, 'Senha precisa ter no mínimo 8 caracteres').openapi({ example: 'senha123' }),
}).openapi('LoginUsuarioInput');

export const createUserSchema = z.object({
	name: z.string().min(3, 'Nome precisa ter no mínimo 3 caracteres').openapi({ example: 'João' }),
	email: z.email({ error: 'Email inválido' }).openapi({ example: 'joao@email.com' }),
	password: z.string().min(8, 'Senha precisa ter no mínimo 8 caracteres').openapi({ example: 'senha123' }),
}).openapi('CreateUsuarioInput');

export const verifyUserParamSchema = z.object({
	id: z.coerce.number().openapi({
		param: { name: 'id', in: 'path', required: true },
		example: 1,
	}),
	code: z.string().regex(/^\d{6}$/).openapi({
		param: { name: 'code', in: 'path', required: true },
		example: '123456',
	}),
}).openapi('VerificarUsuarioParams');
