import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const userResponseSchema = z.object({
	id: z.number().openapi({ example: 10 }),
	name: z.string().openapi({ example: 'João' }),
	email: z.email().openapi({ example: 'joao@email.com' }),
}).openapi('Usuario');

export const userIdParamSchema = z.object({
	id: z.coerce.number().openapi({
		param: { name: 'id', in: 'path', required: true },
		example: 1,
	}),
});

export const listUsersResponseSchema = z.object({
	totalElements: z.number().openapi({ example: 10 }),
	content: z.array(userResponseSchema),
}).openapi('ListaUsuarios');

export const editUserSchema = z.object({
    name: z.string().min(3, 'Nome precisa ter no mínimo 3 caracteres').openapi({ example: 'João' }),
	email: z.email({ error: 'Email inválido' }).openapi({ example: 'joao@email.com' }),
}).partial().openapi('EditUsuarioInput');
