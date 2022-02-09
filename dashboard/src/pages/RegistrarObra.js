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
          <Input className="mt-1" placeholder="Título da Obra"/>
        </Label>

        {/* <Label className="mt-2">
          <span>Nome do Autor</span>
          <Input className="mt-1" placeholder="Nome do Autor e Co-Autores"/>
        </Label> */}

        <Label className="mt-3">
          <span>Descrição da Obra</span>
          <Textarea className="mt-1" rows="6" placeholder="Descrição" />
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

      </div>
    </>
  )
}

export default RegistrarObra
