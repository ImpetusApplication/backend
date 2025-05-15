const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req,res) => {
    res.send('Olá mundo !');
});

module.exports = app;