import axios from './Axios';
import jwt_decode from "jwt-decode";


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
                localStorage.setItem('nome',decoded.nome)
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