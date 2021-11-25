import axios from './Axios';

export default class Usuario{
    constructor(nome,email,publicAddress,cargo){
        this.nome = nome;
        this.email = email;
        this.publicAddress = publicAddress;   
        this.cargo = cargo;     
    }
    cadastrarUsuario = async () =>{
        try{
            let response = await axios.post("/register",{email:this.email,nome:this.nome,publicAddress:this.publicAddress,cargo:this.cargo});
            response = response.data;
            if(response.token){
                localStorage.setItem("token",response.token);
                return true;
            }
            return false;
        
        }catch(e){
            throw e;
        }
    }

    static logar = async (publicAddress) =>{
        try{   
            let response = await axios.post('/login',{publicAddress});
            response = response.data;
            if(response.token){
                localStorage.setItem("token",response.token);
                return true;
            }

            return false;

        }catch(e){
            throw e;
        }
    }

    static deslogar = async () =>{
        localStorage.removeItem("token");
        return true;
    }
}