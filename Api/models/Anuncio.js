const db = require('../database/ConnectionString');
const {Model,DataTypes} = require('sequelize');
const User = require('./User');
const Anuncio = db.define('anuncio',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    valor:{
        type:DataTypes.DOUBLE,
        allowNull:false,
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
});


module.exports = Anuncio;