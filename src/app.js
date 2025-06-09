const express = require('express');
const userRoutes = require('./routes/userRoutes');
const grupoRoutes = require('./routes/grupoRoutes')
const autenticador = require('./middleware/authMiddleware');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Backend-API</title>
  </head>
  <body>
      <h1>BEM VINDO A API MAIS FODA DO MUNDO</h1>
      <a href="https://ibb.co/RT9Zxnm7"><img src="https://i.ibb.co/fd2BhR5Q/Whats-App-Image-2025-05-14-at-00-34-31.jpg" alt="Whats-App-Image-2025-05-14-at-00-34-31" border="0" width="300"></a>
      <h1>Documentacao so no meu whatsapp bb</h1>
  </body>
  </html>
  `;

  res.send(html);
});

app.use(express.json());

app.use('/users', userRoutes);
app.use('/grupos', grupoRoutes)
module.exports = app;