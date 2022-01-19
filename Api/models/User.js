const db = require('../database/ConnectionString');
const {Model,DataTypes} = require('sequelize');
const User = db.define('user',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nome:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    publicAddress:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate: { isLowercase: true }

    },
    nonce:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue: () => Math.floor(Math.random() * 1000000)
    }
});
module.exports = User;