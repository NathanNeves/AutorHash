const {Sequelize} = require('sequelize');
const path = require('path');
require('dotenv').config({path:__dirname+'/./../.env'})
const sequelize = new Sequelize(
{   dialect:'mysql',
    username:process.env.DB_USER,
    host:process.env.DB_HOST,
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE
});

module.exports = sequelize;