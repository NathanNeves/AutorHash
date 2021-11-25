const User = require('../models/User');
const jwt = require('jsonwebtoken');
class UserController{
    invalidToken = [];


    static register = async (req,res)=>{
        try{
            let {email,nome,cargo_id,publicAdress} = req.body;
            let user = await User.create({
                email,
                nome,
                cargo_id,
                publicAdress
            }
            );
            if(user.id){
                return res.status(200).send({mensagem:"Usuário criado com sucesso"});
            }
                return res.status(500).send({mensagem:"Erro ao criar usuário"});
        }catch(e){
            console.log(e);
        }
    }

    
    static getNonce = async (req,res) => {
        let user = await User.findOne({where:publicAdress});
        if(user === null) return res.status(404).send({mensagem:"Você não está cadastrado"});
        return res.status(200).send({nonce:user.nonce});
    }

    static login = async (req,res) =>{  
        try{
            let {publicAddress,signature} = req.body;
            let user = await User.findOne({where:publicAdress});
            if(user === null) return res.status(404).send({mensagem:"Você não está cadastrado"});
            const msg = `Estou assinando meu nonce ${user.nonce}`;
            const msgBuffer = ethUtil.toBuffer(msg);
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
                let userData = {id:user.id,publicAdress};
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
        }
    }

    static refreshToken = async () =>{
        
    }

}

module.exports = UserController;