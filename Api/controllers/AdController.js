const { Anuncio, Obra } = require("../models");
const fs = require("fs");
const contract_abi = fs.readFileSync('../blockchain/build/contracts/AutToken.json','utf-8');

class AdController{

    constructor(nftStorage,web3){
        this.client = nftStorage;
        this.web3 = web3;
    }
    

    createAd = async (req,res) =>{
        try{
            let {valor,nftId,transactionHash} = req.body;
            let transactionInfo = await this.web3.eth.getTransactionReceipt(transactionHash);
            if(transactionInfo.from !== req.user.publicAddress || transactionInfo.status == false){
                return res.status(403).send({msg:"Transação invalida"});
            }
            if(valor <=0){
                return res.status(403).send({msg:"Valor menor que 0"});
            }

            let obra = await Obra.findOne({where:{id:nftId,userId:req.user.id}});
            if(obra == null){
                return res.status(403).send({msg:"A obra deve pertencer a você"});
            }
            let anuncio = await Anuncio.create({
                userId:req.user.id,
                obraId:obra.id,
                status:true,
                valor
            });

            return res.status(200).send({anuncio});
        }catch(e){
            console.log(e);
            return res.status(500).send({msg:"Erro interno no sistema"});
        }
    }


    editAd = async (req,res) => {
        try{
            let {valor,nftId} = req.body;
            let obra = await Anuncio.findOne({where:{obraId:nftId,userId:req.user.id}});
            if(obra == null){
                return res.status(403).send({msg:"O Anuncio deve pertencer a você"});
            }
            if(valor <= 0){
                return res.status(403).send({msg:"Valor deve ser maior que zero"});
            }
            obra.valor = valor;
            let novaObra = await obra.save();
            return res.status(200).send({msg:novaObra});
        }catch(e){
            return res.status(500).send({msg:"Erro interno no sistema"});
        }
    }

    deleteAd = async (req,res) => {
        try{
            let {nftId} = req.body;
            let obra = await Obra.findOne({where:{id:nftId,userId:req.user.id}});
            if(obra == null){
                return res.status(403).send({msg:"A obra deve pertencer a você"});
            }
            let contract = await new this.web3.eth.Contract(JSON.parse(contract_abi).abi,process.env.NFT_CONTRACT_ADDRESS); 
            let account = this.web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_WALLET_KEY);
            let transaction = await contract.methods.transferFrom;
            let response = await transaction(process.env.STORE_WALLET,req.user.publicAddress,nftId).send({from:account.address,gas:200000});
            let anuncio = await Anuncio.findOne({where:{obraId:nftId}});
            if(anuncio == null){
                return res.status(403).send({msg:"NFT não existente em nenhum anuncio"});
            }
            await anuncio.destroy();
            return res.status(200).send({msg:"Anuncio Excluido com Sucesso"});
        }catch(e){
            console.log(e)
            return res.status(500).send({msg:"Erro interno no sistema"});
        }
    }

}

module.exports = AdController;