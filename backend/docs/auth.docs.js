import { defaultResponseSchema } from '../validators/generic.validator.js';
import { createUserSchema, userResponseSchema, listUsersResponseSchema, userIdParamSchema, editUserSchema, } from '../validators/user.validator.js';
import { registry } from './registry.js';

const userResponseEnvelopeSchema = defaultResponseSchema.extend({
	data: userResponseSchema,
}).openapi('UsuarioResponse');

const listUsersResponseEnvelopeSchema = defaultResponseSchema.extend({
	data: listUsersResponseSchema,
}).openapi('ListaUsuariosResponse');

registry.registerPath({
	method: 'get',
	path: '/api/auth/listar',
	tags: ['Auth'],
	summary: 'Lista os usuários',
	responses: {
		200: {
			description: 'Usuários listados com sucesso',
			content: { 'application/json': { schema: listUsersResponseEnvelopeSchema } },
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
			content: { 'application/json': { schema: userResponseEnvelopeSchema } },
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
			content: { 'application/json': { schema: userResponseEnvelopeSchema } },
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
		200: {
			description: 'Usuário atualizado com sucesso',
			content: { 'application/json': { schema: userResponseEnvelopeSchema } },
		},
	},
});

registry.registerPath({
	method: 'delete',
	path: '/api/auth/excluir/{id}',
	tags: ['Auth'],
	summary: 'Exclua um usuário permanentemente',
	request: { params: userIdParamSchema },
	responses: {
		200: { 
			description: 'Usuário excluído com sucesso',
			content: { 'application/json': { schema: defaultResponseSchema } }
		},
	},
});
