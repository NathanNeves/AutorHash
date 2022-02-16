const { Anuncio, Obra } = require("../models");

class LojaController{

    static listAds = async(req,res) =>{
            try{
                let {greatPrice,minorPrice,page,name,description,data_inicio,data_fim,size,my} = req.query;
                let where = {
                }

                if(name !== undefined){
                    where.name = name;
                }
    
                if(description !== undefined){
                    where.description = name;
                }
    
                if(data_inicio !== undefined && data_fim !== undefined){
                    where.createdAt = {[Op.gt]:data_inicio,[Op.lt]:data_fim};
                }else if(data_inicio !== undefined){
                    where.createdAt = {[Op.gt]: data_inicio};
                }else if(data_fim !== undefined){
                    where.createdAt = {[Op.lt]:data_fim};
                }

                let whereAnuncio = {
                    status:true
                };
                if(my==1){
                    whereAnuncio.userId = req.user.id;
                    delete whereAnuncio['status'];
                }
                let Anuncios = await Anuncio.findAll({limit:Number(size),offset:Number(page),include:[{
                    model:Obra,
                    where
                }],where:whereAnuncio});
                return res.status(200).send({Anuncios});
    
    
            }catch(e){
                console.log(e);
                return res.status(500).send({msg:"Erro interno no sistema"});
            }
    }



    static getSingleAd = async (req,res) => {
        try{
            let {anuncioId} = req.query;
            let anuncio = await Anuncio.findOne({include:[{model:Obra,
            }],where:{id:anuncioId,status:true}});
            return res.status(200).send(anuncio);
        }catch(e){
            console.log(e);
            return res.status(500).send({msg:"Erro interno no sistema"});
        }
    }
}


module.exports = LojaController;