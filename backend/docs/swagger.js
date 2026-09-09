import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { createUserSchema, userResponseSchema, listUsersResponseSchema, } from '../validators/user.validator.js';

const registry = new OpenAPIRegistry();

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

const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDocument = generator.generateDocument({
	openapi: '3.0.0',
	info: { title: 'Devoday API', version: '1.0.0' },
	servers: [{ url: 'http://localhost:3003' }],
});
