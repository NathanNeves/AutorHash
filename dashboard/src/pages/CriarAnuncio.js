import React, { useState, useEffect } from 'react'

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
import styled from 'styled-components';
import Request from '../Classes/Request'

function CriarAnuncio() {

  const [page, setPage] = useState(1)
  const [obras, setObras] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const history = useHistory();

  const resultsPerPage = 5

  const Hext = styled.p`
	
{
  overflow: hidden;
  width: 39vw;
  text-overflow: ellipsis;
}
`

  function onPageChange(p) {
    setPage(p)
  }

  useEffect(() => {

    Request.getRequest("/listObras?size=500&page=0").then(res => {
      setObras(res.data.obras.slice((page - 1) * resultsPerPage, page * resultsPerPage))
      setTotalResults(res.data.obras.length)})
    }, [page]
  );

    const [isModalOpen, setIsModalOpen] = useState(false)
  
    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() {
      setIsModalOpen(false)
    }

  return (
    <>
      <PageTitle>Criar Anúncio</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        

        

        <Label className="mt-3">
          <span>Valor:</span>
          <Input type="number" className="mt-1" placeholder="" />
        </Label>
        
        <div className="px-4 py-3 mt-5 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <TableContainer className=" mb-4">
        <SectionTitle>Minhas Obras</SectionTitle>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Obra</TableCell>
              
              <TableCell>Anunciar</TableCell>
              <TableCell>Data de Registro</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {obras.map((obra, i) => (
              <TableRow key={i}>
                <TableCell> 
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{obra.name}</p>
                    </div>
                  </div>
                  </TableCell>
                <TableCell><Hext>
                  <span className="text-sm" >{obra.description}</span>
                  </Hext>
                  </TableCell>          
                
                <TableCell>
                  
                <Label radio>
                  <div className="flex flex-justify-center ml-6">
                    
                  <Input type="radio" size="larger" value="" name="Selecionar" />
                  </div>
                </Label>

                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(obra.createdAt).toLocaleDateString()}</span>
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
      </div> 
         
        <div className="mt-5">
            <Button onClick={openModal}>Confirmar Anúncio</Button>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Confirmar Anúncio</ModalHeader>
        <ModalBody>
        <div className="flex">
            <b className="mb-3 mr-1 text-gray-600 dark:text-gray-400">Obra:</b> 
            <p className="mb-3 text-gray-600 dark:text-gray-400">Título da Obra</p>
            </div>
        <div className="flex">
        <b className="mb-2 mr-1 text-gray-600 dark:text-gray-400">Valor:</b> 
            <p className="mb-2 text-gray-600 dark:text-gray-400">0 AUT$</p>
            </div>
        
        <b >LEMBRE-SE!</b><br />
        <p>Confira as informações de anúncio acima. Caso estejam corretas clique em continuar</p>
          
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

export default CriarAnuncio
