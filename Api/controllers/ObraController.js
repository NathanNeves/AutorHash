const {Obra} = require('../models');
const {Op} = require('sequelize');

class ObraController{

   static listObras = async (req,res) => {
        try{
            let {page,name,description,data_inicio,data_fim,size} = req.query;
            let where = {
                userId: req.user.id
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

            let obras = await Obra.findAll({limit:Number(size),offset:Number(page),where});
            return res.status(200).send({obras});


        }catch(e){
            console.log(e);
            return res.status(500).send({msg:"Erro interno no sistema"});
        }


    }


    static getObra = async (req,res) => {
        try{
            let {obraId} = req.query;
            let obra = await Obra.findOne({where:{id:obraId}});
            return res.status(200).send(obra);

        }catch(e){
            console.log(e);
            return res.status(500).send({msg:"Erro interno no sistema"});
        }
    }




}


module.exports = ObraController;