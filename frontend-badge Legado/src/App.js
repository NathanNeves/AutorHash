import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from 'react';
import Web3 from 'web3';
import Input from './components/Input';
import Select  from './components/Select';
import OrangeButton from './components/OrangeButton';
import MetaMaskIcon from './metamask.svg';
function App() {
  const [publicAddress,setPublicAddress] = useState("");
  const [NomeState,setNameState] = useState("");
  const [emailState,setEmailState] = useState("");
  const [selectValues,setSelectValues] = useState([{name:"Teste",value:1},{name:"Teste2",value:2}]);
  const [selectState,setSelectedState] = useState("");
  useEffect(()=>{
   /* let setPublicAddressState = async () => {
      let accounts = await window.ethereum.request({ method: 'eth_accounts' });
      setPublicAddress(accounts[0]);
    }
    setPublicAddressState();*/
  },[])

  return (
      <div className=" h-full flex w-full">
        <div className="m-auto w-96 bg-white rounded shadow-sm">
          <div className="p-3">
            <Input onChange={(e)=>{setNameState(e.value)}} value={NomeState} placeholder="Nome"></Input>
          </div>
          <div className="p-3">
            <Input onChange={(e)=>{setEmailState(e.value)}} value={emailState} placeholder="E-mail"></Input>
          </div>
          <div className="p-3 w-22">
            <OrangeButton disabled={false}>
              <div>
                <img className=" h-9 " src={MetaMaskIcon}></img>
              </div>
              <span className="ml-14">Conectar Carteira</span>
            </OrangeButton>
          </div>
        </div>
      </div>
    
  );
}

export default App;
