import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { listUsersResponseSchema, userResponseSchema } from './user.validator';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const defaultResponseSchema = z.object({
	success: z.boolean().openapi({ example: true }),
	message: z.string().openapi({ example: "Cadastrado com sucesso" }),
	data: z.unknown(),
}).openapi('defaultResponse');

export const userResponseEnvelopeSchema = defaultResponseSchema.extend({
	data: userResponseSchema,
}).openapi('UsuarioResponse');

export const listUsersResponseEnvelopeSchema = defaultResponseSchema.extend({
	data: listUsersResponseSchema,
}).openapi('ListaUsuariosResponse');
