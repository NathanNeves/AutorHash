const {Obra,User,Anuncio,Transacao} = require('../models');
const db = require('./ConnectionString');
(async () => {
    await db.sync({force:true});
})()