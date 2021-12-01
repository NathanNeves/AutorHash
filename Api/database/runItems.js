const {Obra,User,Anuncio} = require('../models');
const db = require('./ConnectionString');
(async () => {
    await db.sync({force:true});
})()