import { createUserSchema, userResponseSchema, listUsersResponseSchema, userIdParamSchema, editUserSchema, } from '../validators/user.validator.js';
import { registry } from './registry.js';

registry.registerPath({
	method: 'get',
	path: '/api/auth/listar',
	tags: ['Auth'],
	summary: 'Lista os usuários',
	responses: {
		200: {
			description: 'Usuários listados com sucesso',
			content: { 'application/json': { schema: listUsersResponseSchema } },
		},
	},
});

registry.registerPath({
	method: 'get',
	path: '/api/auth/{id}',
	tags: ['Auth'],
	summary: 'Exibe um usuário',
	request: {
		params: userIdParamSchema,
	},
	responses: {
		200: {
			description: 'Usuário encontrado com sucesso',
			content: { 'application/json': { schema: userResponseSchema } },
		},
		404: { description: 'Usuário não encontrado' },
	},
});

registry.registerPath({
	method: 'post',
	path: '/api/auth/cadastro',
	tags: ['Auth'],
	summary: 'Cria um novo usuário',
	request: {
		body: {
			content: { 'application/json': { schema: createUserSchema } },
		},
	},
	responses: {
		201: {
			description: 'Usuário criado com sucesso',
			content: { 'application/json': { schema: userResponseSchema } },
		},
	},
});

registry.registerPath({
	method: 'patch',
	path: '/api/auth/editar/{id}',
	tags: ['Auth'],
	summary: 'Edita um usuário parcialmente',
	request: {
		params: userIdParamSchema,
		body: {
			content: { 'application/json': { schema: editUserSchema } },
		},
	},
	responses: {
		201: {
			description: 'Usuário atualizado com sucesso',
			content: { 'application/json': { schema: userResponseSchema } },
		},
	},
});
