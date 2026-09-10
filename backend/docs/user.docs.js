import { defaultResponseSchema, listUsersResponseEnvelopeSchema, userResponseEnvelopeSchema } from '../validators/generic.validator.js';
import { userIdParamSchema, editUserSchema } from '../validators/user.validator.js';
import { registry } from './registry.js';

registry.registerPath({
	method: 'get',
	path: '/api/user/listar',
	tags: ['User'],
	summary: 'Lista os usuários',
	responses: {
		200: {
			description: 'Usuários listados com sucesso',
			content: {
				'application/json': {
					schema: listUsersResponseEnvelopeSchema,
					example: {
						success: true,
						message: 'Operação realizada com sucesso',
						data: {
							totalElements: 1,
							content: [{ id: 1, name: 'João', email: 'joao@email.com' }],
						},
					},
				},
			},
		},
	},
	security: [{ bearerAuth: [] }],
});

registry.registerPath({
	method: 'get',
	path: '/api/user/{id}',
	tags: ['User'],
	summary: 'Exibe um usuário',
	request: { params: userIdParamSchema },
	responses: {
		200: {
			description: 'Usuário encontrado com sucesso',
			content: {
				'application/json': {
					schema: userResponseEnvelopeSchema,
					example: {
						success: true,
						message: 'Operação realizada com sucesso',
						data: { id: 1, name: 'João', email: 'joao@email.com' },
					},
				},
			},
		},
	},
	security: [{ bearerAuth: [] }],
});

registry.registerPath({
	method: 'patch',
	path: '/api/user/editar/{id}',
	tags: ['User'],
	summary: 'Edita um usuário parcialmente',
	request: {
		params: userIdParamSchema,
		body: { content: { 'application/json': { schema: editUserSchema } } },
	},
	responses: {
		200: {
			description: 'Usuário atualizado com sucesso',
			content: {
				'application/json': {
					schema: userResponseEnvelopeSchema,
					example: {
						success: true,
						message: 'Operação realizada com sucesso',
						data: { id: 1, name: 'João', email: 'joao@email.com' },
					},
				},
			},
		},
	},
	security: [{ bearerAuth: [] }],
});

registry.registerPath({
	method: 'delete',
	path: '/api/user/excluir/{id}',
	tags: ['User'],
	summary: 'Exclui um usuário permanentemente',
	request: { params: userIdParamSchema },
	responses: {
		200: {
			description: 'Usuário excluído com sucesso',
			content: {
				'application/json': {
					schema: defaultResponseSchema,
					example: {
						success: true,
						message: 'Usuário excluído com sucesso',
						data: null,
					},
				},
			},
		},
	},
	security: [{ bearerAuth: [] }],
});
