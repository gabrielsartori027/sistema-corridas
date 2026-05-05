const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./Categoria');

const Corrida = sequelize.define('Corrida', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    origem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destino: {
        type: DataTypes.STRING,
        allowNull: false
    },
    distancia: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    tempoEstimado: {
        type: DataTypes.INTEGER, // em minutos
        allowNull: false
    },
    valorTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categoria,
            key: 'id'
        }
    }
}, {
    tableName: 'corridas',
    timestamps: true
});

Corrida.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
Categoria.hasMany(Corrida, { foreignKey: 'categoriaId', as: 'corridas' });

module.exports = Corrida;
