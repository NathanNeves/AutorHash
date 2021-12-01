const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ethUtil = require('ethereumjs-util');
class UserController{
    invalidToken = [];


    static register = async (req,res)=>{
        try{
            let {email,nome,publicAddress} = req.body;
            let user = await User.create({
                email,
                nome,
                publicAddress
            }
            );
            if(user.id){
                return res.status(200).send({mensagem:"Usuário criado com sucesso",success:true});
            }
                return res.status(500).send({mensagem:"Erro ao criar usuário",success:false});
        }catch(e){
            console.log(e);
        }
    }

    
    static getNonce = async (req,res) => {
        let  {publicAddress} = req.body;
        let user = await User.findOne({where:{publicAddress}});
        if(user === null) return res.status(404).send({mensagem:"Você não está cadastrado"});
        return res.status(200).send({nonce:user.nonce});
    }

    static login = async (req,res) =>{  
        try{
            let {publicAddress,signature} = req.body;
            let user = await User.findOne({where:{publicAddress}});
            if(user === null) return res.status(404).send({mensagem:"Você não está cadastrado"});
            const msgBuffer = ethUtil.toBuffer('0x'+user.nonce.toString(16));
            const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
            const signatureBuffer = ethUtil.toBuffer(signature);
            const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
            const publicKey = ethUtil.ecrecover(
            msgHash,
            signatureParams.v,
            signatureParams.r,
            signatureParams.s
            );
            const addressBuffer = ethUtil.publicToAddress(publicKey);
            const address = ethUtil.bufferToHex(addressBuffer);
            if (address.toLowerCase() === publicAddress.toLowerCase()) {
                let userData = {id:user.id,publicAddress};
                const token = jwt.sign(userData,process.env.TOKEN_SECRET,{expiresIn:3000});
                const refreshToken = jwt.sign(userData,process.env.REFRESH_TOKEN_SECRET,{expiresIn:3060});
                user.nonce = Math.floor(Math.random() * 1000000);
                await user.save();
                return res.status(200).send({mensagem:"Sucesso!",token,refreshToken});
            } else {
            return res
                .status(401)
                .send({ error: 'Assinatura fracassada' });
            }
        }catch(e){
            console.log(e);
            return res.status(500).send({error:"Erro interno do sistema"});
            
        }
    }

    static refreshToken = async (req,res) =>{
        try{
            let {refreshToken} = req;
            let decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
            const new_token = jwt.sign({id:decoded.id,publicAddress:decoded.publicAddress},process.env.TOKEN_SECRET,{expiresIn:3000});
            const new_refresh_token = jwt.sign({id:decoded.id,publicAddress:decoded.publicAddress},process.env.REFRESH_TOKEN_SECRET,{expiresIn:3060});
            return res.status(200).send({new_token,new_refresh_token});

        }catch(e){
            console.log(e);
            return res.status(500).send({error:"Erro interno do sistema"});
            
        }
    }

}

module.exports = UserController;