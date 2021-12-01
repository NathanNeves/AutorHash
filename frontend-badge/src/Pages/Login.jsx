import React,{useState,useEffect} from 'react';
import OrangeButton from '../components/OrangeButton';
import Metamask from '../metamask.svg';
import Usuario from '../Classes/Usuario';
import Web3 from 'web3';
import {useNavigate} from 'react-router-dom';
function Login(){
    
    let navigate = useNavigate();
    const login = async () => {
        try{
            await window.ethereum.enable();
            let accounts = await window.ethereum.request({ method: 'eth_accounts' });
            let web3 = new Web3(window.ethereum);
            let publicAddress = accounts[0];
            let response = await Usuario.getNonce(publicAddress);
            console.log(response.nonce);
            console.log(publicAddress);
            let signature = await web3.eth.personal.sign('0x'+response.nonce.toString(16),publicAddress);
            let resposta = await Usuario.logar(publicAddress,signature);
            if(resposta){
                navigate('/painel')
            }
        }catch(e){
            console.log(e)
        }

    }    




    return(
        <div className="h-full flex">
            <div className="w-80 m-auto">
                <OrangeButton onClick={login} >
                    <div>
                        <img className="w-8" src={Metamask}/>
                    </div>
                    <div className="ml-24 text-white">
                        Login
                    </div>
                </OrangeButton>
            </div>
        </div>
    );
}


export default Login;