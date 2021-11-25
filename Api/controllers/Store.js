class Store{

    constructor(web3Instance,storeAbi){
        this.web3Instance = web3Instance;
        this.abi = storeAbi;
    }
    
    comprarToken =  async(req,res) =>{
        try{
            let {value} = req.body;
            let id = req.userId;
        }catch(e){
            console.log(e);
            res.status(200).send({mensagem:"Erro interno no sistema"});
        }

    }

}