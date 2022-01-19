import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Usuario from '../Classes/Usuario';
import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Input, Label, Button } from '@windmill/react-ui'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'

function Login() {
  const history = useHistory();
  const [publicAddress,setPublicAddress] = useState("");
  const [NomeState,setNameState] = useState("");
  const [emailState,setEmailState] = useState("");
  const [selectValues,setSelectValues] = useState([]);
  const [selectState,setSelectedState] = useState("");
  useEffect(()=>{
    /*let cargo = async () =>{
      try{
        let cargoslist = await Cargo.getCargos();
        cargoslist = cargoslist.map((item)=>({name:item.nome,value:item.id}));
        setSelectValues(cargoslist);
      }catch(e){
        console.log(e);
      }
    }*/

    const setPublicAddressState = async () => {
      try{
        await window.ethereum.enable();
        let accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setPublicAddress(accounts[0]);
      }catch(e){
          console.log(e);
      }
    }
    setPublicAddressState();
  },[])

  


  const submitForm = async (e) =>{
      try{
          e.preventDefault();
          let usuario = new Usuario(NomeState,emailState,publicAddress);
          let response = await usuario.cadastrarUsuario();
          if(response){
            history.push('/login');
          }
        }catch(e){
        console.log(e);
      }
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form onSubmit={(e)=>{submitForm(e)}}>
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Crie Sua Conta
                </h1>
                <Label>
                  <span>Nome</span>
                  <Input onChange={(e)=>{setNameState(e.target.value)}} value={NomeState} placeholder="José dos Santos"></Input>
                </Label>
                <Label>
                  <span>Email</span>
                  <Input onChange={(e)=>{setEmailState(e.target.value)}} value={emailState} placeholder="jose@email.com"></Input>
                </Label>
                <Label className="mt-6" check>
                  <Input type="checkbox" />
                  <span className="ml-2">
                    Eu concordo com a <span className="underline">Política de Privacidade</span>
                  </span>
                </Label>

                <Button type="submit" block className="mt-4">
                  Criar Conta
                </Button>

                <hr className="my-8" />

                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    to="/login"
                  >
                    Já está cadastrado? Faça o Login
                  </Link>
                </p>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
