const db = require('../database/ConnectionString');
const {Model,DataTypes} = require('sequelize');
const User = require('./User');
const NFTUsers = db.define('nft_users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_user:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    hash:{
        type:DataTypes.TEXT,
        allowNull:false
    }
});


module.exports = NFTUsers;