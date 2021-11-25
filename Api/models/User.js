const db = require('../database/ConnectionString');
const {Model,DataTypes} = require('sequelize');
const Cargo = require('./Cargo');
const NFTUsers = require('./NFTUsers');
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
    cargo_id:{
        type:DataTypes.INTEGER,
        required:true,
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
User.hasOne(Cargo);
NFTUsers.belongsTo(User);
module.exports = User;