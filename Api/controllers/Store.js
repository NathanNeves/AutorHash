const User = require("../models/User");
const { Obra,Transacao, Anuncio, User } = require("../models");
const fs = require('fs');
let { File,Blob } = require('nft.storage');
const contract_abi = fs.readFileSync('../blockchain/build/contracts/AutToken.json','utf-8');
class Store{

    constructor(nftStorage,web3){
        this.client = nftStorage;
        this.web3 = web3;
    }
    
    mint =  async(req,res) =>{
        try{
            let {name,description} = req.body;
            let user = await User.findByPk(req.user.id);
            if(user.moeda <= 0){
                return res.status(403).send({msg:"Saldo insuficiente"});
            }
            user.moeda-= 2000;
            await user.save();
            const {filename,mimetype,originalname} = req.file;
            const metadata = await this.client.store({
                name,
                description,
                image: new File([await fs.promises.readFile('./uploads/'+filename)],filename, {
                  type: mimetype,
                })
            });
            let contract = await new this.web3.eth.Contract(JSON.parse(contract_abi).abi,process.env.NFT_CONTRACT_ADDRESS); 
            let account = this.web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_WALLET_KEY);
            let transaction = await contract.methods.authenticateDocument;
            let response = await transaction(req.user.publicAddress,metadata.url).send({from:account.address,gas:200000});
            await Obra.create({name,description,image_url:metadata.data.image.href.replace('ipfs://','https://ipfs.io/ipfs/'),userId:req.user.id,id:response.events.Transfer.returnValues.tokenId});
            await fs.promises.rm('./uploads/'+filename)
            return res.status(200).send({msg:response});
        }catch(e){
            console.log(e);
            res.status(500).send({mensagem:"Erro interno no sistema"});
        }
    }


    buyAutorCoins = async (req,res) => {
        let numeroGrande = 1000000000000000000
        console.log("cheguei aqui")
        try{
            let {transactionHash} = req.body;
            console.log(transactionHash)
            let transacao =  await Transacao.findOne({where:{transactionHash}});
            let transactionInfo = await this.web3.eth.getTransactionReceipt(transactionHash);
            let transactionValue = await this.web3.eth.getTransaction(transactionHash);
            transactionValue = transactionValue.value
            if(transacao !== null){
                console.log("sera?")
                return res.status(403).send({msg:"Transacao invalida"});
            }
            
            if(transactionInfo.from !== req.user.publicAddress || transactionInfo.to  !== process.env.STORE_WALLET.toLowerCase() || transactionInfo.status == false || transactionValue <= 0  ){ 
                return res.status(403).send({msg:"Transação invalida"});
            }
            let user = await User.findByPk(req.user.id);
            user.moeda += (transactionValue/numeroGrande)*950;
            console.log("valor: "+user.moeda)
            await user.save();
            res.status(200).send({msg:"Transação realizada com sucesso"});
        }catch(e){
            console.log(e);
            res.status(500).send({msg:"Erro interno no sistema"});
        }
    }


    buy = async (req,res) => {
        try{
            let {obraId} = req.body;
            let anuncio = await Anuncio.findOne({where:{obraId}});
            if(anuncio == null){
                return res.status(404).send({msg:"Anuncio não encontrado"});

            }
            let user = await User.findByPk(req.user.id);
            let user2 = await User.findByPk(anuncio.userId);
            novoSaldo =  user.moeda - anuncio.valor;
            if(novoSaldo < 0){
                return res.status(403).send({msg:"Saldo insuficiente"});
            }
            user.moeda = novoSaldo;
            user2.moeda += anuncio.valor;
            let contract = await new this.web3.eth.Contract(JSON.parse(contract_abi).abi,process.env.NFT_CONTRACT_ADDRESS); 
            let account = this.web3.eth.accounts.transfer(process.env.PRIVATE_WALLET_KEY);
            let transaction = await contract.methods.transferFrom;
            let response = await transaction(process.env.STORE_WALLET,req.user.publicAddress,obraId).send({from:account.address,gas:200000});
            await anuncio.destroy();
         
        }catch(e){
            res.status(500).send({msg:"Erro interno no sistema"});
        }
    }
}

module.exports = Store;
