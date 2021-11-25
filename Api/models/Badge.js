const db = require('../database/ConnectionString');
const {Model,DataTypes} = require('sequelize');
const Badge = db.define('badge',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
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
    img_blob:{
        type:DataTypes.BLOB,
        allowNull:false,
        required:true
    }
})

module.exports = Badge;