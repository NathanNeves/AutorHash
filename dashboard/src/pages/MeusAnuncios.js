import React, { useState, useEffect } from 'react'
import { SearchIcon } from '../icons'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import CTA from '../components/CTA'
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


import response from '../utils/demo/tableData'
// make a copy of the data, for the second table
const response2 = response.concat([])


function MeusAnuncios() {
  /**
   * DISCLAIMER: This code could be badly improved, but for the sake of the example
   * and readability, all the logic for both table are here.
   * You would be better served by dividing each table in its own
   * component, like Table(?) and TableWithActions(?) hiding the
   * presentation details away from the page view.
   */


  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1)
  const [pageTable2, setPageTable2] = useState(1)

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([])
  const [dataTable2, setDataTable2] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChangeTable1(p) {
    setPageTable1(p)
  }

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable1(response.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
  }, [pageTable1])

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  }, [pageTable2])

  return (
    <>
      <PageTitle>Meus Anúncios</PageTitle>

      <div className="flex">
      
      <Card style={{width: "100%"}} className="mb-6">
      
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
          </Card>

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
            {dataTable1.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {user.amount}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable1}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default MeusAnuncios
