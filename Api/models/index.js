const Obra = require('./Obra');
const Anuncio = require('./Anuncio');
const User = require('./User');
const Transacao = require('./Transacao');
module.exports = {Obra,Anuncio,User,Transacao};
Obra.belongsTo(User);
Anuncio.belongsTo(User);
Anuncio.belongsTo(Obra);
Transacao.belongsTo(User);
