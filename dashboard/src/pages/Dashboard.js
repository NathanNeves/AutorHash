import React, { useState, useEffect } from 'react'

import InfoCard from '../components/Cards/InfoCard'
import SectionTitle from '../components/Typography/SectionTitle'
import PageTitle from '../components/Typography/PageTitle'
import {  
  ChatIcon, 
  AnkaIcon,
  MuseuIcon,
  DepositoIcon,
  AnuncioIcon,
  CartIcon, 
  SearchIcon,
  MoneyIcon, 
  PeopleIcon 
} from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import Request from '../Classes/Request'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Card, 
  CardBody,
  Input, Label, Select,
  Avatar,
  Badge,
  Pagination,
} from '@windmill/react-ui'

import { useHistory } from 'react-router-dom'

import styled from 'styled-components';



 
       
  


function Dashboard() {
  const [page, setPage] = useState(1)
  const [nome, setNome] = useState("")
  const [obras, setObras] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const history = useHistory();

  const HoverText = styled.p`
	
	:hover {
		cursor: pointer;
	}
`

const Hext = styled.p`
	
{
  overflow: hidden;
  width: 39vw;
  text-overflow: ellipsis;
}
`

  // pagination setup
  const resultsPerPage = 5


  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  const redirect = ()=> {
    history.push("/app/comprarAutorcoin")
  }

  const redirectObra = (obraID)=> {
    history.push("/app/obra/"+obraID)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  
  useEffect(() => {

    Request.getRequest("/listObras?size=500&page=0").then(res => {
      setObras(res.data.obras.slice((page - 1) * resultsPerPage, page * resultsPerPage))
      setTotalResults(res.data.obras.length)
    })
    setNome(localStorage.getItem("nome"))
  }, [page])

  return (
    <>
      <PageTitle>Meu Painel</PageTitle>
      <SectionTitle>Olá, {nome}</SectionTitle>
      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        <InfoCard title="Obras Registradas" value="12">
          <RoundIcon
            icon={MuseuIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total de AutorCoins" value="46.760,89">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />

        </InfoCard>

        <InfoCard title="Total de Anúncios" value="376">
          <RoundIcon
            icon={AnuncioIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <div>
        <Button size="larger" className="w-full" onClick={redirect}>Comprar AutorCoins</Button>
      </div>


      <div className="grid gap-6 mt-8 md:grid-cols-1">
      
      <TableContainer className="mb-2">
      <SectionTitle>Minhas Obras</SectionTitle>
        <Card style={{width: "100%"}} className="mb-2">
      
      <CardBody>
      <SectionTitle>Filtro:</SectionTitle>
      <div className="flex direction-row">
       
      <Label className="mr-3">
    <span>Obra</span>
    <Input className="mt-1" placeholder="Monalisa" />
    </Label>

    <Label className="mr-3">
      <span>Criado em:</span>      
      <Input type="date" className='mt-1' type='date'/>
    </Label>

    <div className="mr-3 mt-6">
    <Button icon={SearchIcon} aria-label="Like" />
    </div>

      </div>
      </CardBody>
    </Card>


        <Table>
          <TableHeader>
            <tr>
              <TableCell>Titulo</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Criada em</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {obras.map((obra, i) => (
              
              <TableRow key={i} onClick={()=>{redirectObra(obra.id)}}>
                <TableCell > <HoverText>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{obra.name}</p>
                    </div>
                  </div>
                  </HoverText> </TableCell>
                <TableCell><HoverText><Hext>
                  <span className="text-sm" >{obra.description}</span>
                  </Hext>
                  </HoverText></TableCell>
                <TableCell><HoverText>
                  <span className="text-sm">{new Date(obra.createdAt).toLocaleDateString()}</span>
                  </HoverText></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      
      </div>
    </>
  )
}

export default Dashboard
