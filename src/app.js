const express = require('express');
const userRoutes = require('./routes/userRoutes');
const autenticador = require('./middleware/authMiddleware');

const app = express();

app.get('/', (req, res) => {
    res.send('Bem Vindo a Minha API');
});

app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Acesse /docs para ler a documentação');
});

module.exports = app;