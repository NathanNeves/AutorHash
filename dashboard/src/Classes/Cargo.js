import axios from './Axios';

export default class Cargo{
    static getCargos = async () =>{
        try{
            let response = await axios.get("/cargo");
            return response.data;
        }catch(e){
            throw e;
        }
    }

}