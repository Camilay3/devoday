import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const defaultResponseSchema = z.object({
	success: z.boolean().openapi({ example: true }),
	message: z.string().openapi({ example: "Cadastrado com sucesso" }),
	data: z.unknown(),
}).openapi('defaultResponse');
