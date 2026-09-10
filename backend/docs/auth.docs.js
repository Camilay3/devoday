import { defaultResponseSchema } from '../validators/generic.validator.js';
import { createUserSchema, userResponseSchema, listUsersResponseSchema, userIdParamSchema, editUserSchema, loginUserSchema, tokenResponseSchema, } from '../validators/user.validator.js';
import { registry } from './registry.js';

registry.registerComponent('securitySchemes', 'bearerAuth', { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' });

const userResponseEnvelopeSchema = defaultResponseSchema.extend({
	data: userResponseSchema,
}).openapi('UsuarioResponse');

const listUsersResponseEnvelopeSchema = defaultResponseSchema.extend({
	data: listUsersResponseSchema,
}).openapi('ListaUsuariosResponse');

const loginResponseEnvelopeSchema = defaultResponseSchema.extend({
	data: tokenResponseSchema,
}).openapi('LoginResponse');

const errorResponses = {
	400: { description: 'Dados inválidos', content: { 'application/json': { schema: defaultResponseSchema } } },
	401: { description: 'Token não informado', content: { 'application/json': { schema: defaultResponseSchema } } },
	403: { description: 'Token inválido ou expirado', content: { 'application/json': { schema: defaultResponseSchema } } },
	404: { description: 'Recurso não encontrado', content: { 'application/json': { schema: defaultResponseSchema } } },
	409: { description: 'Conflito', content: { 'application/json': { schema: defaultResponseSchema } } },
	500: { description: 'Erro interno', content: { 'application/json': { schema: defaultResponseSchema } } },
};

registry.registerPath({
	method: 'post',
	path: '/api/auth/login',
	tags: ['Auth'],
	summary: 'Autentica um usuário',
	request: {
		body: {
			content: { 'application/json': { schema: loginUserSchema } },
		},
	},
	responses: {
		201: {
			description: 'Login realizado com sucesso',
			content: { 'application/json': { schema: loginResponseEnvelopeSchema } },
		},
		...errorResponses,
	},
});

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
		...errorResponses,
	},
	security: [{ bearerAuth: [] }],
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
		...errorResponses,
	},
	security: [{ bearerAuth: [] }],
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
		...errorResponses,
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
		...errorResponses,
	},
	security: [{ bearerAuth: [] }],
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
		...errorResponses,
	},
	security: [{ bearerAuth: [] }],
});
