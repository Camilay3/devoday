import express from "express";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
app.listen(3003, () => console.log('Servidor iniciado!'));

const swaggerDocument = YAML.load('./swagger.yaml');
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/auth/cadastro', (req, res) => {
	console.log(req.body);
	res.status(201).json({ message: 'Cadastro recebido' });
});
