import React from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'
import Metamask from '../assets/svg/metamask.svg';
import Usuario from '../Classes/Usuario';
import Web3 from 'web3';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'

function Login() {

  const history = useHistory();
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
          history.push('/app')
        }
    }catch(e){
        console.log(e)
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
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>

              <Button onClick={login} className="mt-4" block>
                  Login
                <div>
                  <img style={{marginLeft: "5px"}} className="w-8" src={Metamask}/>
                </div>  
              </Button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Esqueceu sua Senha?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Criar Conta
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
