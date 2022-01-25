const Web3 = require('web3');
const express = require('express');
let fs = require('fs');
const { strictEqual } = require('assert');
const app = express();
let store = fs.readFileSync('../blockchain/build/contracts/Store.json','utf-8');
let web3 = new Web3('http://127.0.0.1:7545')
const UserController = require('./controllers/UserController');
const User = require('./models/User');
const Store = require('./controllers/Store');
const cors = require('cors');
const multer = require('multer');
let { NFTStorage, File } = require('nft.storage');
const { application } = require('express');
let upload = multer({
    dest:'uploads/',
    limits:{fileSize:'10000'}
}).single('fileToUpload');



app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.post('/api/register',UserController.register);
app.post('/api/login',UserController.login);
app.post('/api/mint',upload,Store.mint);
app.post('/api/getNonce',UserController.getNonce);



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