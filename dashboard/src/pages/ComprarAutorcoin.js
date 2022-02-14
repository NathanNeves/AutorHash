import React, { useState } from 'react'

import Store from "../Classes/Store"

import PageTitle from '../components/Typography/PageTitle'
import {Button, } from '@windmill/react-ui'

import logo from "../icons/AutorCoin.png"

function ComprarAutorcoin() {

  return (
    <>
      <div className="flex flex-col items-center">
      <h3 className="text-5xl font-semibold text-gray-700 dark:text-gray-200">Comprar</h3>
      <h3 className="text-5xl font-semibold text-gray-700 dark:text-gray-200">AutorCoins</h3>
      <img style={{width: "25%"}} src={logo}/>
      <p className="text-gray-700 dark:text-gray-300">
        Compre AutorCoins para registrar suas obras!
      </p>
      <p className="text-gray-700 dark:text-gray-300">Ao clicar no botão de compra você será redirecionado para a extensão da Metamask.</p> <br/> 
      <p className="text-gray-700 dark:text-gray-300">A quantidade de AutorCoin adquirida é igual a 1000x (um mil vezes) a quantidade de Ethereum transferida.</p> <br/>

      <Button size="larger" onClick={Store.comprarCoin()}>Comprar</Button><br/>
    </div>

    </>
  )
}

export default ComprarAutorcoin
