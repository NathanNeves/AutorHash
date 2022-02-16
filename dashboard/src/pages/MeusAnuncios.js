import React, { useState, useEffect } from 'react'
import { SearchIcon } from '../icons'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { useHistory } from 'react-router-dom'

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Card, 
  CardBody,
  Input, Label, Select,
  Badge,
  Avatar, 
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../icons'
import Request from '../Classes/Request'

function MeusAnuncios() {
 
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const history = useHistory()

  const resultsPerPage = 10

  function onPageChange(p) {
    setPage(p)
  }

  const redirectAnuncio = (anuncioID)=> {
    history.push("/app/anuncio/"+anuncioID)
  }

  useEffect(() => {

    Request.getRequest("/getAnuncios?size=500&page=0&my=0").then(res =>{
      setData(res.data.Anuncios.slice((page - 1) * resultsPerPage, page * resultsPerPage))
      setTotalResults(res.data.Anuncios.length)
    })
  }, [page])
  
  return (
    <>
      <PageTitle>Meus Anúncios</PageTitle>

      <div className="flex">
      
     {/* <Card style={{width: "100%"}} className="mb-6">
      
            <CardBody>
            <SectionTitle>Filtro:</SectionTitle>
            <div className="flex direction-row">
             
            <Label className="mr-3">
          <span>Anúncio</span>
          <Input className="mt-1" placeholder="Jane Doe" />
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
            </CardBody>
          </Card>*/}

      </div>

      <SectionTitle>Anúncios</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Obra</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Data do Anúncio</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((anuncio, i) => (
              <TableRow key={i} onClick={()=>{redirectAnuncio(anuncio.id)}}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{anuncio.obra.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">AUT$ {anuncio.valor}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(anuncio.createdAt).toLocaleDateString()}</span>
                </TableCell>
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
    </>
  )
}

export default MeusAnuncios
