const Web3 = require('web3');
const express = require('express');
let fs = require('fs');
const { strictEqual } = require('assert');
const app = express();
//let store = fs.readFileSync('../blockchain/build/contracts/Store.json','utf-8');
let web3 = new Web3('http://127.0.0.1:7545')
const UserController = require('./controllers/UserController');
const User = require('./models/User');
const Store = require('./controllers/Store');
const ObraController = require('./controllers/ObraController');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
let { NFTStorage, File } = require('nft.storage');
const { application } = require('express');
const LojaController = require('./controllers/LojaController');
const AdController = require('./controllers/AdController');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
});


let upload = multer({
    storage,
    limits:{fileSize:'10000'}
}).single('fileToUpload');



function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
      if (err) return res.status(403).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.user = decoded;
      next();
    });
}


let nftStorage = new NFTStorage({token:process.env.NFT_STORAGE_API_KEY,endpoint:"https://api.nft.storage"});
let store = new Store(nftStorage,web3);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.post('/api/register',UserController.register);
app.post('/api/login',UserController.login);
app.post('/api/mint',verifyJWT,upload,store.mint);
app.post('/api/getNonce',UserController.getNonce);
app.get('/api/listObras',verifyJWT,ObraController.listObras);
app.get("/api/getObra",verifyJWT,ObraController.getObra);
app.post('/api/buy',verifyJWT,store.buyAutorCoins);
app.get('/api/getAnuncio',verifyJWT,LojaController.getSingleAd);
app.get('/api/getAnuncios',verifyJWT,LojaController.listAds);
app.delete('/api/deletarAnuncio',verifyJWT,AdController.deleteAd);
app.post('/api/criarAnuncio',verifyJWT,AdController.createAd);
app.put('/api/editarAnuncio',verifyJWT,AdController.editAd);
app.get('/api/getSaldo',verifyJWT,UserController.getUserBalance);


app.listen(8000,()=>{
    console.log('Rodando servidor na porta 8000');
})
/*async function main(){
    let contract = await new web3.eth.Contract(JSON.parse(store).abi,'0xE1faE6100f4b3ceC8922405b396A1Fec20C81327')
    const wallet = '0xb27c24BdB0727119F27fC1a75B0d78237aED7433';
    //web3.eth.accounts.privateKeyToAccount(wallet);
    contract.methods.buy().send({from:wallet,value:100}, async (error,transaction)=>{
        console.log(error);
        console.log(transaction);
    });
}
main();*/