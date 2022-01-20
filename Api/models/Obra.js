const db = require('../database/ConnectionString');
const {Model,DataTypes} = require('sequelize');
const Obra = db.define('obra',{
    id:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        required:true,
        allowNull:false

    },
    description:{
        type:DataTypes.TEXT,
        required:true,
        allowNull:false
    },
})

module.exports = Obra;