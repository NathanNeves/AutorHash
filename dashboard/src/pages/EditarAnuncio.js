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

function EditarAnuncio() {

  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const history = useHistory();

  const resultsPerPage = 5
  const totalResults = response.length

  function onPageChange(p) {
    setPage(p)
  }



  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

    const [isModalOpen, setIsModalOpen] = useState(false)
  
    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() {
      setIsModalOpen(false)
    }

  return (
    <>
      <PageTitle>Editar Anúncio</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        

      <p className="mb-3 font-semibold text-gray-600 dark:text-gray-300"></p> {/* {obra.name} */}

        <Label className="mt-3">
          <span>Valor:</span>
          <Input type="number" className="mt-1" placeholder="" />
        </Label>
        
        
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

export default EditarAnuncio
