import axios from './Axios';

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
                localStorage.setItem("token",response.token);
                localStorage.setItem('refreshToken',response.refreshToken)
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

    static getHeader = () =>{
        token = localStorage.getItem("token")

        return {
            "x-access-token": token
        }
    }
}