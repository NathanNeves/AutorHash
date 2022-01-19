import React,{useState,useEffect} from 'react';
import Web3 from 'web3';
import Input from '../components/Input';
import Select  from '../components/Select';
import OrangeButton from '../components/OrangeButton';
import Button from '../components/Button';
import Usuario from '../Classes/Usuario';
import Cargo from '../Classes/Cargo'
import {useNavigate} from 'react-router-dom';
function App(props) {
  let navigate = useNavigate();
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
            navigate('/login');
          }
        }catch(e){
        console.log(e);
      }
  }

  return (
      <div className=" h-full flex w-full">
        <form onSubmit={(e)=>{submitForm(e)}} className="m-auto w-96 bg-white rounded shadow-sm">
          <div className="p-3">
            <Input onChange={(e)=>{setNameState(e.target.value)}} value={NomeState} placeholder="Nome"></Input>
          </div>
          <div className="p-3">
            <Input onChange={(e)=>{setEmailState(e.target.value)}} value={emailState} placeholder="E-mail"></Input>
          </div>
          <div className="p-3">
            <Button  type="submit" disabled={false}>
              <span className="m-auto">Cadastrar</span>
            </Button>
          </div>
        </form>
      </div>
    
  );
}

export default App;
