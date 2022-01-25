const User = require("../models/User");
const { Obra,Transacao } = require("../models");
const contract = require("../../blockchain/build/contracts/AutToken.json");
class Store{

    constructor(nftStorage,File,web3){
        this.File = File;
        this.client = nftStorage;
        this.web3 = web3;
    }
    
    static mint =  async(req,res) =>{
        try{
            let {name,description,transactionHash} = req.body;
            let transactionInfo = await this.web3.eth.getTransaction(transactionHash);
            if(transactionInfo.from !== req.user.publicAddress || transaction.to  !== process.env.STORE_WALLET){ 
                return res.status(403).send({msg:"Transação invalida"});
            }
            Transacao.create({userId:req.user.id,transactionHash});
            const {buffer,filename,mimetype} = req.file
            const metadata = await this.client.store({
                name,
                description,
                image:new this.File(buffer,filename,{type:mimetype})
            });
            let url = metadata.url;
            let contract = await new this.web3.eth.Contract(JSON.parse(contract).abi,process.env.NFT_STORAGE_ADDRESS); 
            web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_WALLET_KEY);
            let transaction = await contract.methods.authenticateDocument(req.publicAddress,url).send({from:process.env.PRIVATE_WALLET_KEY,value:1000});
            return res.status(200).send({msg:transaction});
        }catch(e){
            console.log(e);
            res.status(200).send({mensagem:"Erro interno no sistema"});
        }
    }
}

module.exports = Store;