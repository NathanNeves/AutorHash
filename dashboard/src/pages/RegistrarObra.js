import React, { useState } from 'react'

import CTA from '../components/CTA'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { Input, HelperText, Label, Select, Textarea, Button, Modal, ModalHeader, ModalBody, ModalFooter, } from '@windmill/react-ui'

import { MailIcon } from '../icons'

function RegistrarObra() {

    const [isModalOpen, setIsModalOpen] = useState(false)
  
    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() {
      setIsModalOpen(false)
    }

  return (
    <>
      <PageTitle>Registrar Obra</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Título</span>
          <Input className="mt-1" placeholder="Myne Rose"/>
        </Label>

        <Label className="mt-2">
          <span>Nome do Autor</span>
          <Input className="mt-1" placeholder="Gabriel Lamounier"/>
        </Label>

        <Button className="mt-3">Adicionar Co-Autor +</Button>

        <Label className="mt-3">
          <span>Descrição da Obra</span>
          <Textarea className="mt-1" rows="6" placeholder="Uma arte digital desenhada por Gabriel Lamounier que contém uma com orelhas de gato" />
        </Label>

        <Label className="mt-3">
          <span>Mídia</span>
          <Input type="file" className="mt-1" placeholder="Arquivo"/>
        </Label>

        <div className="mt-5">
            <Button onClick={openModal}>Confirmar Registro</Button>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Confirmar o Registro</ModalHeader>
        <ModalBody>
        <p>O registro de sua obra irá custar um total de 0.11111 AutorCoins</p>
        <p className="mt-1">LEMBRE-SE!</p>
        <p className="mt-1">Confira as informações inseridas nos campos. Caso estejam corretas clique em continuar</p>
          
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button>Accept</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      </div>
    </>
  )
}

export default RegistrarObra
