const db = require('../database/ConnectionString');
const {Model,DataTypes} = require('sequelize');
const Transacao = db.define('transacao')