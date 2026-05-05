const express = require('express');
const sequelize = require('./config/database');

require('./models/Categoria');
require('./models/Corrida');

const categoriaRoutes = require('./routes/categoriaRoutes');
const corridaRoutes = require('./routes/corridaRoutes');

const app = express();
app.use(express.json());

app.use('/categorias', categoriaRoutes);
app.use('/corridas', corridaRoutes);

sequelize.sync().then(() => {
    console.log('Banco sincronizado');
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
}).catch(err => {
    console.error('Erro ao conectar no banco:', err);
});
