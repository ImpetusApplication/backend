const express = require('express');
const userRoutes = require('./routes/userRoutes');
const autenticador = require('./middleware/authMiddleware');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Impetus',
    version: '1.0.0',
    description: 'Documentação da API do projeto Impetus',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          name: {
            type: 'string',
            example: 'João Silva',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'joao.silva@example.com',
          },
          birthdate: {
            type: 'string',
            format: 'date',
            example: '1990-05-15',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2023-05-01T12:00:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2023-05-02T15:30:00Z',
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/users', userRoutes);

module.exports = app;