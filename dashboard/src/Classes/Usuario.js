import axios from './Axios';
import jwt_decode from "jwt-decode";
import Request from './Request';


export default class Usuario{
    constructor(nome,email,publicAddress){
        this.nome = nome;
        this.email = email;
        this.publicAddress = publicAddress;   
    }
    cadastrarUsuario = async () =>{
        try{
            let response = await axios.post("/register",{email:this.email,nome:this.nome,publicAddress:this.publicAddress});
            let status = response.status;
            if(status === 200){
                return true;
            }
            return false;
        
        }catch(e){
            throw e;
        }
    }

    static logar = async (publicAddress,signature) =>{
        try{   
            let response = await axios.post('/login',{publicAddress,signature});
            response = response.data;
            if(response.token){
                let decoded = jwt_decode(response.token);
                console.log(decoded);
                localStorage.setItem("publicAddressUser",publicAddress);
                localStorage.setItem("token",response.token);
                localStorage.setItem('refreshToken',response.refreshToken)
                localStorage.setItem('userId',decoded.id)
                localStorage.setItem('nome',decoded.name)
                let saldo = await Request.getRequest("/getSaldo")
                if(saldo.data.balance!=null){
                    localStorage.setItem('saldo',saldo.data.balance)
                }else{
                    localStorage.setItem('saldo',0)
                }
                return true;
            }

            return false;

        }catch(e){
            throw e;
        }
    }


    static getNonce = async (publicAddress) =>{
        try{
            let response = await axios.post('/getNonce',{publicAddress})
            return response.data;
        }catch(e){
            throw e;
        }
    }

    static deslogar = async () =>{
        localStorage.removeItem("token");
        return true;
    }

    static getHeader = async () =>{
        let token = await localStorage.getItem("token")
        
        return {
            "headers": {
                "x-access-token": token,
            }
   
        }
    }
}