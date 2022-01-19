const Obra = require('./Obra');
const Anuncio = require('./Anuncio');
const User = require('./User');
module.exports = {Obra,Anuncio,User};
Obra.belongsTo(User);
Anuncio.belongsTo(User);
Anuncio.belongsTo(Obra);