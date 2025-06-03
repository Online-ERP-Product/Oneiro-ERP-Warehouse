import express from 'express';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', routes);

export default app;

