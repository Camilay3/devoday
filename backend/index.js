import express from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import routes from './routes/index.js';
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { responseMiddleware } from './middlewares/response.middleware.js';

const app = express();
app.get('/health', (_req, res) => res.sendStatus(200));
app.listen(3003, () => console.log('Servidor iniciado!'));

import { openApiDocument } from './docs/swagger.js';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use(express.json());
app.use(cors({
	origin: process.env.CORS_ORIGIN,
	credentials: true,
}));
app.use('/api', responseMiddleware);
app.use('/api', routes);
app.use(errorMiddleware);
