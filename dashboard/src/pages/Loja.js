import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, CardBody } from '@windmill/react-ui'
import { SearchIcon } from '../icons'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import {
  Input, Label, Select,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../icons'
import Request from '../Classes/Request'

import logo from "../icons/AutorCoin.png"
import logo2 from "../assets/img/create-account-office-dark.jpeg"
import logo3 from "../assets/img/create-account-office.jpeg"

import styled from 'styled-components';
function Loja() {
  const history = useHistory();
  const redirect = ()=> {
    history.push("/app/criaranuncio")
  }

  const HoverText = styled.p`
	
	:hover {
		cursor: pointer;
	}
`

  // pagination setup
  const resultsPerPage = 10
  const [totalResults, setTotalResults] = useState(0)
  const [page,setPage] = useState(0)
  const [data,setData] = useState([])

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  const redirectAnuncio = (anuncioID)=> {
    history.push("/app/anuncio/"+anuncioID)
  }


  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {

    Request.getRequest("/getAnuncios?size=500&page=0&my=false").then(res =>{
      setData(res.data.Anuncios.slice((page - 1) * resultsPerPage, page * resultsPerPage))
      setTotalResults(res.data.Anuncios.length)
    })

    
  }, [page])
  
  return (
    <>
      <PageTitle>Loja</PageTitle>

      <div className="flex">
      
      <Card style={{width: "100%"}} className="mb-6">
      
            <CardBody>
              
            <SectionTitle>Filtro:</SectionTitle>
            <div className="flex justify-between">
            
            <div className="flex direction-row">
             
            <Label className="mr-3">
          <span>Anúncio</span>
          <Input className="mt-1"  placeholder="Jane Doe" />
          </Label>
          
          <Label className="mr-3">
          <span>Valor Até:</span>
          <Select className="mt-1">
            <option>AUT$ 25</option>
            <option>AUT$ 50</option>
            <option>AUT$ 100</option>
            <option>AUT$ 150</option>
          </Select>
          </Label>

          <Label className="mr-3">
          <span>Criado em:</span>
          
            <Input type="date" className='mt-1' type='date'/>
            </Label>

          <div className="mr-3 mt-6">
          <Button icon={SearchIcon} aria-label="Like" />
          </div>

            </div>
            <Button onClick={redirect}>Criar Anúncio</Button>
            </div>
            
            </CardBody>
          </Card>

      </div>

      <SectionTitle>Anúncios</SectionTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-3">
      {data.map((anuncio, i) => (        
        <Card onClick={()=>{redirectAnuncio(anuncio.id)}}>
          <HoverText>
          <CardBody className="flex flex-col items-center justify-between" style={{height: "100%"}}>
          <div className="flex flex-col items-center">
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">{anuncio.obra.name}</p>
            <img style={{width: "90%"}} src={anuncio.obra.image_url}/>
            <span className="text-gray-600 dark:text-gray-300">Criado em: {new Date(anuncio.createdAt).toLocaleDateString()}</span>
          </div>
          </CardBody></HoverText>
        </Card>
      ))}  
        </div>
        <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChange}
            label="Table navigation"
          />

      
    </>
  )
}

export default Loja
