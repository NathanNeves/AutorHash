import React, { useState } from 'react'

import PageTitle from '../components/Typography/PageTitle'
import { Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, } from '@windmill/react-ui'

import logo from "../icons/AutorCoin.png"

function ComprarAutorcoin() {
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="flex flex-col items-center">
      <h3 className="text-5xl font-semibold text-gray-700 dark:text-gray-200">Comprar</h3>
      <h3 className="text-5xl font-semibold text-gray-700 dark:text-gray-200">AutorCoins</h3>
      <img style={{width: "25%"}} src={logo}/>
      <p className="text-gray-700 dark:text-gray-300">
        Compre AutorCoins para registrar suas obras!
      </p>
      <p className="text-gray-700 dark:text-gray-300">Digite a quantidade de AutorCoins que deseja comprar</p> <br/> 
      
      <div style={{width: "40%"}} className="px-4 py-3 mb-2 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <Input type="number" className="mt-1" placeholder="0" />
        </Label>
      </div>
      <Button size="larger" onClick={openModal}>Comprar</Button><br/>
    </div>

    <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Confirmar o Registro</ModalHeader>
        <ModalBody>
        <p>O registro de sua obra irá custar um total de 0.11111 AutorCoins</p><br />
        <b >LEMBRE-SE!</b><br />
        <p>Confira as informações inseridas nos campos. Caso estejam corretas clique em continuar</p>
          
        </ModalBody>
        <ModalFooter>
          
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancelar
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button>Confirmar</Button> 
          </div>
          
        </ModalFooter>
      </Modal>

    </>
  )
}

export default ComprarAutorcoin
