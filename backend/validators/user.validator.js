import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const userResponseSchema = z.object({
	id: z.number().openapi({ example: 10 }),
	name: z.string().openapi({ example: 'João' }),
	email: z.string().email().openapi({ example: 'joao@email.com' }),
}).openapi('Usuario');

export const listUsersResponseSchema = z.object({
	totalElements: z.number().openapi({ example: 10 }),
	data: z.array(userResponseSchema),
}).openapi('ListaUsuarios');

export const createUserSchema = z.object({
	name: z.string().min(3, 'Nome precisa ter no mínimo 3 caracteres').openapi({ example: 'João' }),
	email: z.string().email('Email inválido').openapi({ example: 'joao@email.com' }),
	password: z.string().min(8, 'Senha precisa ter no mínimo 8 caracteres').openapi({ example: 'senha123' }),
}).openapi('CreateUsuarioInput');
