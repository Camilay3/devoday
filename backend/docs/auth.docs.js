import { defaultResponseSchema, userResponseEnvelopeSchema } from '../validators/generic.validator.js';
import { createUserSchema, loginUserSchema, tokenResponseSchema } from '../validators/auth.validator.js';
import { registry } from './registry.js';

registry.registerComponent('securitySchemes', 'bearerAuth', { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' });

const loginResponseEnvelopeSchema = defaultResponseSchema.extend({
	data: tokenResponseSchema,
}).openapi('LoginResponse');

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
			content: {
				'application/json': {
					schema: loginResponseEnvelopeSchema,
					example: {
						success: true,
						message: 'Operação realizada com sucesso',
						data: {
							accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
							user: { id: 1, name: 'João', email: 'joao@email.com' },
						},
					},
				},
			},
		},
	},
});

registry.registerPath({
	method: 'post',
	path: '/api/auth/cadastro',
	tags: ['Auth'],
	summary: 'Cria um novo usuário',
	request: { body: { content: { 'application/json': { schema: createUserSchema } } } },
	responses: {
		201: {
			description: 'Usuário criado com sucesso',
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
});
