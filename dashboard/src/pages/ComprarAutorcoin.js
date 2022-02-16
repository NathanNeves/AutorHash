import React, { useState, useEffect } from 'react'

import Store from "../Classes/Store"

import PageTitle from '../components/Typography/PageTitle'
import {Button, Input } from '@windmill/react-ui'

import logo from "../icons/AutorCoin.png"

function ComprarAutorcoin() {

  const [valor,setValor] = useState(0)

  return (
    <>
      <div className="flex flex-col items-center">
      <h3 className="text-5xl font-semibold text-gray-700 dark:text-gray-200">Comprar</h3>
      <h3 className="text-5xl font-semibold text-gray-700 dark:text-gray-200">AutorCoins</h3>
      <img style={{width: "25%"}} src={logo}/>
      <p className="text-gray-700 dark:text-gray-300">
        Compre AutorCoins para registrar suas obras!
      </p>
      <p className="text-gray-700 dark:text-gray-300">Ao clicar no botão de compra você será redirecionado para a extensão da Metamask.</p> 
      <p className="text-gray-700 dark:text-gray-300">A quantidade de AutorCoin adquirida é igual a 1000x (um mil vezes) a quantidade de Ethereum transferida.</p> <br/>
<div>
      <Input type="number" value={valor} onChange={e=>setValor(e.target.value)} size="small" className="mt-1 mb-3" placeholder="Quantidade de AutorCoin" />
      </div>
      <Button size="larger" onClick={()=>{Store.comprarCoin(valor)}}>Comprar</Button><br/>
    </div>

    </>
  )
}

export default ComprarAutorcoin
