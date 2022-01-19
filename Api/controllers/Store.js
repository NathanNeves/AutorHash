const User = require("../models/User");

class Store{

    constructor(web3Instance,storeAbi){
        this.web3Instance = web3Instance;
        this.abi = storeAbi;
    }
    
    mintNFT =  async(req,res) =>{
        try{
            let {userData} = req;
            let id = userData.id;
            let user = await User.findByPk(id);
            let publicAddress = user.publicAddress;
        }catch(e){
            console.log(e);
            res.status(200).send({mensagem:"Erro interno no sistema"});
        }
    }

}