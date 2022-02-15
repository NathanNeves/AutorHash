const User = require("../models/User");
const { Obra,Transacao } = require("../models");
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
            await Obra.create({name,description,image_url:metadata.url,userId:req.user.id,id:response.events.Transfer.returnValues.tokenId});
            await fs.promises.rm('./uploads/'+filename)
            return res.status(200).send({msg:response});
        }catch(e){
            console.log(e);
            res.status(500).send({mensagem:"Erro interno no sistema"});
        }
    }


    buyAutorCoins = async (req,res) => {
        console.log("cheguei aqui")
        try{
            let {transactionHash} = req.body;
            let transacao =  await Transacao.findOne({where:{transactionHash}});
            let transactionInfo = await this.web3.eth.getTransactionReceipt(transactionHash);
            let transactionValue = await this.web3.eth.getTransaction(transactionHash);
            transactionValue = transactionValue.value
            if(transacao !== null){
                return res.status(403).send({msg:"Transacao invalida"});
            }
            
            if(transactionInfo.from !== req.user.publicAddress || transactionInfo.to  !== process.env.STORE_WALLET || transactionInfo.status == false || transactionValue > 0  ){ 
                return res.status(403).send({msg:"Transação invalida"});
            }
            let user = await User.findByPk(req.user.id);
            user.moeda = transactionValue*950;
            await user.save();
            res.status(200).send({msg:"Transação realizada com sucesso"});
        }catch(e){
            console.log(e);
            res.status(200).send({mensagem:"Erro interno no sistema"});
        }
    }
}

module.exports = Store;
