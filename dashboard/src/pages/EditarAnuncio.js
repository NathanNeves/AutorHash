import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'

import Request from '../Classes/Request'

import CTA from '../components/CTA'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { Input, HelperText, Label, Select, Textarea, Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, TableHeader, TableCell, TableBody, TableRow, TableFooter, TableContainer, Avatar, Badge, Pagination,} from '@windmill/react-ui'
  import {
    doughnutOptions,
    lineOptions,
    doughnutLegends,
    lineLegends,
  } from '../utils/demo/chartsData'
  import RoundIcon from '../components/RoundIcon'
  import response from '../utils/demo/tableData'
  import { useHistory } from 'react-router-dom'
import { MailIcon } from '../icons'
import { CheckIcon } from '../icons'
import loadingif from "../icons/loading-buffering.gif"

function EditarAnuncio() {

  const [anuncio, setAnuncio] = useState({})
  const [obra, setObra] = useState({})
  const [aux, setAux] = useState(0)
  const [valor, setValor] = useState(0)
  const {id} = useParams()
  const [mensagem, setMensagem] = useState("")
  const history = useHistory();

  useEffect(() => {

    if(aux==0){
      Request.getRequest("/getAnuncio?anuncioId="+id).then(res => {
        setAnuncio(res.data)
        setObra(res.data.obra)
        setAux(1)
      })
    }
    
  })

    let handleSubButton = (val,nftId)=>{

      document.getElementById("confirmb").style.display = "none";
      document.getElementById("cancelb").style.display = "none";
      document.getElementById("lgif").style.display = "block";

      let body = {
        "valor":val,
        "nftId":nftId,
      }

    Request.postRequest("/editarAnuncio",body).then(res=>{
      if(res.status != 200){
        setMensagem(res.data.error)
        closeModal();
        openModal1();
      }else{
        setMensagem("Anúncio Editado com Sucesso!")
        closeModal();
        openModal1();
      }
    })
  }

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpen1, setIsModalOpen1] = useState(false)
  
    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() {
      setIsModalOpen(false)
    }

    function openModal1() {
      setIsModalOpen1(true)
    }
  
    function closeModal1() {
      setIsModalOpen1(false)
    }

  return (
    <>
      <PageTitle>Editar Anúncio</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        

      <p className="mb-3 font-semibold text-gray-600 dark:text-gray-300">{obra.name}</p> 

        <Label className="mt-3">
          <span>Valor:</span>
          <Input type="number" value={valor} onChange={e=>setValor(e.target.value)} className="mt-1" placeholder="" />
        </Label>
        
        
        <div className="mt-5">
            <Button onClick={openModal}>Confirmar Anúncio</Button>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Confirmar Anúncio</ModalHeader>
        <ModalBody>
        <div className="flex">
            <b className="mb-3 mr-1 text-gray-600 dark:text-gray-400">Obra:</b> 
            <p className="mb-3 text-gray-600 dark:text-gray-400">{obra.name}</p>
            </div>
        <div className="flex">
        <b className="mb-2 mr-1 text-gray-600 dark:text-gray-400">Valor:</b> 
            <p className="mb-2 text-gray-600 dark:text-gray-400">AUT$ {anuncio.valor}</p>
            </div>
        
        <b >LEMBRE-SE!</b><br />
        <p>Confira as informações de anúncio acima. Caso estejam corretas clique em continuar</p>
          
        </ModalBody>
        <ModalFooter>
        <img id='lgif' className="hidden mb-2" style={{width: "5%"}} src={loadingif}/>
          <div className="hidden sm:block">
            <Button id='cancelb' layout="outline" onClick={closeModal}>
              Cancelar
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button id='confirmb' onClick={()=>{handleSubButton(valor,obra.id)}}>Confirmar</Button>
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

      </div>
    </>
  )
}

export default EditarAnuncio
