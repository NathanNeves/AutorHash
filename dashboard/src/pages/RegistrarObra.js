import React, { useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import Request from '../Classes/Request'
import { Input, HelperText, Label, Select, Textarea, Button, Modal, ModalHeader, ModalBody, ModalFooter, } from '@windmill/react-ui'
import { useHistory } from 'react-router-dom'
import { MailIcon } from '../icons'
import loadingif from "../icons/loading-buffering.gif"
const FormData = require('form-data');

function RegistrarObra() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpen1, setIsModalOpen1] = useState(false)
  const [mensagem, setMensagem] = useState("")
  const history = useHistory();

  const enviarForm = async () =>{

    document.getElementById("confirmb").style.display = "none";
    document.getElementById("cancelb").style.display = "none";
    document.getElementById("lgif").style.display = "block";

    let fData = new FormData();
    fData.append("name", name)
    fData.append("description", description)
    fData.append("fileToUpload", image)
    
    Request.postRequest("/mint",fData).then(res =>{
      if(res.status != 200){
        setMensagem(res.data.error)
        closeModal();
        openModal1();
      }else{
        setMensagem("Obra Registrada com Sucesso!")
        closeModal();
        openModal1();
      }
    })

  }
  
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
      history.push("/app/dashboard")
    }

  

  return (
    <>
      <PageTitle>Registrar Obra</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Título</span>
          <Input onChange={e => setName(e.target.value)} value={name} className="mt-1" placeholder="Título da Obra"/>
        </Label>

       

        <Label className="mt-3">
          <span>Descrição da Obra</span>
          <Textarea onChange={e => setDescription(e.target.value)} value={description} className="mt-1" rows="6" placeholder="Descrição" />
        </Label>

        <Label className="mt-3">
          <span>Mídia</span>
          <Input onChange={e => setImage(e.target.files[0])} type="file" className="mt-1" placeholder="Arquivo"/>
        </Label>

        <div className="mt-5">
            <Button onClick={openModal}>Confirmar Registro</Button>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Confirmar o Registro</ModalHeader>
        <ModalBody>
        <p>O registro de sua obra irá custar um total de AUT$ 2</p><br />
        <b >LEMBRE-SE!</b><br />
        <p>Confira as informações inseridas nos campos. Caso estejam corretas clique em continuar</p>
          
        </ModalBody>
        <ModalFooter>
        <img id='lgif' className="hidden mb-2" style={{width: "5%"}} src={loadingif}/>
          <div className="hidden sm:block">
            
            <Button id='cancelb' layout="outline" onClick={closeModal}>
              Cancelar
            </Button>
          </div>
          
          <div className="hidden sm:block">
            <Button id='confirmb' onClick={()=>{enviarForm()}}>Confirmar</Button>
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

export default RegistrarObra
