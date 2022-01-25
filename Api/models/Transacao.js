const db = require('../database/ConnectionString');
const {Model,DataTypes} = require('sequelize');
const Transacao = db.define('transacao',{
    transactionHash:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});


module.exports = Transacao;


