const express = require('express');
const userRoutes = require('./routes/userRoutes');
const autenticador = require('./middleware/authMiddleware');

const app = express();

app.get('/', (req, res) => {
    res.send('Bem Vindo a Minha API');
});

app.use(express.json());

<<<<<<< HEAD
=======
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Impetus',
    version: '1.0.0',
    description: 'Documentação da API do projeto Impetus',
  },
  servers: [
    {
      url: 'https://backend-production-9ab9.up.railway.app/',
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

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
>>>>>>> 1.0.0
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Acesse /docs para ler a documentação');
});

module.exports = app;