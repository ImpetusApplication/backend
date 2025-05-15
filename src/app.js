const express = require('express');
const userRoutes = require('./routes/userRoutes');
const autenticador = require('./middleware/authMiddleware'); // importe o middleware

const app = express();
app.use(express.json());

// Protege a rota '/' com o middleware de autenticação
app.get('/', autenticador, (req, res) => {
  res.send('Olá mundo !');
});

app.use('/users', userRoutes);

module.exports = app;