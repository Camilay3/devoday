import express from "express";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import routes from './routes/index.js';
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();
app.get('/health', (_req, res) => res.sendStatus(200));
app.listen(3003, () => console.log('Servidor iniciado!'));

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json())
app.use('/api', routes);
app.use(errorMiddleware);
