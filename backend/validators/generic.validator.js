import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const messageResponseSchema = z.object({
    message: z.string().openapi({
        example: 'Excluído com sucesso'
    })
});
