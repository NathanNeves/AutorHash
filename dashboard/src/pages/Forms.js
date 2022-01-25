import React,{useState,useEffect} from 'react'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import {Input, HelperText, Label, Select, Textarea,Button} from '@windmill/react-ui'
import axios from 'axios';
import { MailIcon } from '../icons'
import Web3 from 'web3';

function Forms() {
    const [nomeObra,setNomeObra] = useState('');
    const [descricao,setDescricao] = useState('');
    const [file,setFile] = useState('');
  const submit = async () => {
      try{
        
        const formData = new FormData();
        formData.append('name',nomeObra);
        formData.append('description',descricao);
        formData.append('fileToUpload',file);
        formData.append('transactionHash',);
        let response = await axios.post('/api/mint',);
        console.log(response.data.msg);

      }catch(e){
          console.log(e);
      }
  }
  
  return (
    <>
      <PageTitle>Minte seu arquivo</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Nome da Obra:</span>
          <Input onChange={(e)=>(setNomeObra(e.target.value))} className="mt-1" placeholder="Ex: O morro dos ventos uivantes" />
        </Label>

        <Label className="mt-4">
          <span>Descrição:</span>
          <Textarea onChange={(e)=>(setDescricao(e.target.value))} className="mt-1" rows="3" placeholder="Descrição da Obra" />
        </Label>

        <Label className="mt-4">            
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Upload file</label>
            <input onChange={(e)=>{setFile(e.target.files[0])}} class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
        </Label>

        <Label className="mt-6" check>
          <Input type="checkbox" />
          <span className="ml-2">
            I agree to the <span className="underline">privacy policy</span>
          </span>
        </Label>
        <Label className="mt-4">
          <Button onClick={submit} >Enviar</Button>
        </Label>
      </div>
    </>
  )
}

export default Forms
