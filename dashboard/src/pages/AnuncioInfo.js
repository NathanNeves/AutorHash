import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'

import Request from '../Classes/Request'

import PageTitle from '../components/Typography/PageTitle'
import { Card, CardBody, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, } from '@windmill/react-ui'
import logo from "../icons/AutorCoin.png"

function AnuncioInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [anuncio, setAnuncio] = useState({})
  const [obra, setObra] = useState({})
  const [aux, setAux] = useState(0)


  const {id} = useParams()
  
    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() {
      setIsModalOpen(false)
    }

    useEffect(() => {
      
      if(aux==0){
        Request.getRequest("/getAnuncio?anuncioId="+id).then(res => {
          setAnuncio(res.data)
          setObra(res.data.obra)
          setAux(1)
        })
      }
    })

  return (
    <>
      <PageTitle>Anúncio</PageTitle>
      <div className="flex mb-4 mt-2">
      <Button size="larger" className="mr-5">Editar Anúncio</Button>
      <Button size="larger" style={{background: "#d11a2a"}} >Excluir Anúncio</Button>
      </div>
      <div>
      <Card style={{width: "100%"}} className="mb-6">
            <CardBody>
            <div className="flex justify-between">
            <div>
            <p className="mb-3 font-semibold text-gray-600 dark:text-gray-300">{obra.name}</p>
            <div className="flex">
            <p className="mb-3 mr-1 text-gray-600 dark:text-gray-400">Valor:</p> 
            <p className="mb-1 text-gray-600 dark:text-gray-400">{anuncio.valor} AUT$</p>
            </div>
            <div className="flex">
            <p className="mb-3 mr-1 text-gray-600 dark:text-gray-400">Criado em:</p> 
            <p className=" text-gray-600 dark:text-gray-400">{new Date(obra.createdAt).toLocaleDateString()}</p>
            </div>
            </div>
            <Button onClick={()=>{openModal()}}>Comprar Obra</Button>
            </div>
            </CardBody>
          </Card>
          </div>

          <Modal isOpen={isModalOpen} onClose={()=>{closeModal()}}>
        <ModalHeader>Confirmar o Registro</ModalHeader>
        <ModalBody>
        <div className="flex">
        <b className="mb-2 mr-1 text-gray-600 dark:text-gray-400">Anúncio:</b> 
            <p className="mb-2 text-gray-600 dark:text-gray-400">{obra.name}</p>
            </div>
        <div className="flex">
        <b className="mb-2 mr-1 text-gray-600 dark:text-gray-400">Valor:</b> 
            <p className="mb-2 text-gray-600 dark:text-gray-400">{anuncio.valor} AUT$</p>
            </div>

            <div className="flex">
            <b className="mb-3 mr-1 text-gray-600 dark:text-gray-400">Criado em:</b> 
            <p className="mb-3 text-gray-600 dark:text-gray-400">{new Date(obra.createdAt).toLocaleDateString()}</p>
            </div>
        
        <b >LEMBRE-SE!</b><br />
        <p>Confira as informações inseridas nos campos. Caso estejam corretas clique em continuar</p>
          
        </ModalBody>
        <ModalFooter>
          
          <div className="hidden sm:block">
            <Button layout="outline" onClick={()=>{closeModal()}}>
              Cancelar
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button>Confirmar</Button>
          </div>
          
        </ModalFooter>
      </Modal>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <div style={{width: "100%"}}>
          <Card style={{width: "100%"}} className="mb-8">
            <CardBody>
            <p className="mb-3 font-semibold text-gray-600 dark:text-gray-300">Titulo da Obra</p>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
              {obra.name}
              </p>

              <p className="mb-3 font-semibold text-gray-600 dark:text-gray-300">Registrada em:</p>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
              {new Date(obra.createdAt).toLocaleDateString()}
              </p>
            </CardBody>
          </Card>
          <Card style={{width: "100%"}}>
            <CardBody>
            <p className="mb-3 font-semibold text-gray-600 dark:text-gray-300">Descrição</p>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
              {obra.description}
              </p>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardBody>
          <p className="mb-1 font-semibold text-gray-600 dark:text-gray-300">Imagem</p>
          <div className="flex flex-col p-3 items-center">
            <img style={{width: "90%"}} src={obra.image_url}/>
          </div>  
          </CardBody>
        </Card>
      </div>
      


    </>
  )
}

export default AnuncioInfo
