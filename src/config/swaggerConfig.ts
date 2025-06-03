import swaggerJSDoc from 'swagger-jsdoc';
import { docs } from '../docs/index'

const isLocal = process.env.NODE_ENV === 'Local';
const serverUrl = isLocal
  ? 'http://localhost:3000/api'
  : 'http://135.181.198.134/api';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Warehouse',
      version: '1.0.0',
      description: 'Warehouse',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', 
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: {
      
    },
    servers: [
      {
        url: serverUrl,
      },
    ],
  },
  apis: ["**/*.ts"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;