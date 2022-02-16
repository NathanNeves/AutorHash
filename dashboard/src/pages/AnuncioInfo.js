import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'

import Request from '../Classes/Request'

import PageTitle from '../components/Typography/PageTitle'
import { Card, CardBody, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, } from '@windmill/react-ui'
import logo from "../icons/AutorCoin.png"
import { useHistory } from 'react-router-dom'
import loadingif from "../icons/loading-buffering.gif"

function AnuncioInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpen1, setIsModalOpen1] = useState(false)
  const [isModalOpen2, setIsModalOpen2] = useState(false)
  const [anuncio, setAnuncio] = useState({})
  const [obra, setObra] = useState({})
  const [aux, setAux] = useState(0)
  const [isMine,setIsMine] = useState(false)
  const [mensagem, setMensagem] = useState("")
  const history = useHistory();
  

  let redirectEditar = (anuncioID) =>{
    history.push("/app/editaranuncio/"+anuncioID)
  }

  let deletarAnuncio = (obraID)=>{
      document.getElementById("confirmb").style.display = "none";
      document.getElementById("cancelb").style.display = "none";
      document.getElementById("lgif").style.display = "block";

      let body = {
        "nftId":obraID,
      }

    Request.postRequest("/deletarAnuncio",body).then(res=>{
      if(res.status != 200){
        setMensagem(res.data.error)
        closeModal2();
        openModal1();
      }else{
        setMensagem("Anúncio Deletado com Sucesso!")
        closeModal2();
        openModal1();
      }
    })
  }

  let comprarObra = (obraID)=>{
    document.getElementById("confirmb1").style.display = "none";
    document.getElementById("cancelb1").style.display = "none";
    document.getElementById("lgif1").style.display = "block";

    let body = {
      "obraId":obraID,
    }

  Request.postRequest("/buyObra",body).then(res=>{
    if(res.status != 200){
      setMensagem(res.data.error)
      closeModal();
      openModal1();
    }else{
      setMensagem("Obra Adquirida com Sucesso")
      closeModal();
      openModal1();
    }
  })
}


  const {id} = useParams()
  
    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() {
      setIsModalOpen(false)
    }

    function openModal2() {
      setIsModalOpen2(true)
    }
  
    function closeModal2() {
      setIsModalOpen2(false)
    }
    function openModal1() {
      setIsModalOpen1(true)
    }
  
    function closeModal1() {
      setIsModalOpen1(false)
      history.push("/app/loja")
    }

    useEffect(() => {

      if(localStorage.getItem("userId") == obra.userId){
        setIsMine(true)
      }else{
        setIsMine(false)
      }
      
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
        {isMine ?
        <Button onClick={()=>{redirectEditar(anuncio.id)}} size="larger" className="mr-5">Editar Anúncio</Button>:
        <></>
        }
        {isMine ?
        <Button size="larger" style={{background: "#d11a2a"}} onClick={()=>{openModal2()}}>Excluir Anúncio</Button>
        :
        <></>
      }
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
            {!isMine ?
            <Button onClick={()=>{openModal()}}>Comprar Obra</Button>
            :
            <></>
            }
            </div>
            </CardBody>
          </Card>
          </div>

          <Modal isOpen={isModalOpen2} onClose={()=>{closeModal2()}}>
        <ModalHeader>Deseja excluir o anúncio?</ModalHeader>
        <ModalBody>
        
        <b >LEMBRE-SE!</b><br />
        <p>Remover o anúncio não irá excluir a sua Obra.</p>
          
        </ModalBody>
        <ModalFooter>
        <img id='lgif' className="hidden mb-2" style={{width: "5%"}} src={loadingif}/>
          <div className="hidden sm:block">
            <Button id='cancelb' layout="outline" onClick={()=>{closeModal2()}}>
              Cancelar
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button id='confirmb' onClick={()=>{deletarAnuncio(obra.id)}}>Confirmar</Button>
          </div>
          
        </ModalFooter>
      </Modal>

          <Modal isOpen={isModalOpen} onClose={()=>{closeModal()}}>
        <ModalHeader>Confirmar a Compra</ModalHeader>
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
        <p>Confira as informações nos campos. Caso estejam corretas clique em continuar</p>
          
        </ModalBody>
        <ModalFooter>
          
        <img id='lgif1' className="hidden mb-2" style={{width: "5%"}} src={loadingif}/>
          <div className="hidden sm:block">
            <Button id='cancelb1' layout="outline" onClick={()=>{closeModal()}}>
              Cancelar
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button id='confirmb1' onClick={()=>{comprarObra(obra.id)}}>Confirmar</Button>
          </div>
          
        </ModalFooter>
      </Modal>

      <Modal isOpen={isModalOpen1} onClose={closeModal1}>
        <ModalHeader>Mensagem</ModalHeader>
        <ModalBody>
        <p>{mensagem}</p><br />          
        </ModalBody>
        <ModalFooter>
          
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal1}>
              Cancelar
            </Button>
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
