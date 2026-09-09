import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { registry } from './registry.js';

import './auth.docs.js';

const generator = new OpenApiGeneratorV3(registry.definitions);
export const openApiDocument = generator.generateDocument({
	openapi: '3.0.0',
	info: { title: 'Devoday API', version: '1.0.0' },
	servers: [{ url: 'http://localhost:3003' }],
});
