const db = require('../database/ConnectionString');
const {Model,DataTypes} = require('sequelize');

const Cargo = db.define('cargo',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nome:{
        type:DataTypes.STRING,
        unique:true
    }

});

module.exports = Cargo;