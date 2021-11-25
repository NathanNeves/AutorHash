const {Badge,User,NFTUsers,Cargo} = require('../models');
const db = require('./ConnectionString');
(async () => {
    await db.sync({force:true});
})()