import React, { useState, useEffect } from 'react'

import {useParams} from 'react-router-dom'
import Request from '../Classes/Request'

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import InfoCard from '../components/Cards/InfoCard'
import { Card, CardBody } from '@windmill/react-ui'
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import logo from "../icons/AutorCoin.png"

function ObraInfo() {

  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [imgurl, setImgurl] = useState("")
  const [date, setDate] = useState("")

  const {id} = useParams()

  useEffect(() => {
    
    Request.getRequest(`/getObra?obraId=`+id).then(res =>{
      setTitulo(res.data.name)
      setDescricao(res.data.description)
      setImgurl(res.data.image_url)
      setDate(res.data.createdAt)
      })
  })

  return (
    <>
      <PageTitle>Minha Obra</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <div style={{width: "100%"}}>
          <Card style={{width: "100%"}} className="mb-8">
            <CardBody>
            <p className="mb-3 font-semibold text-gray-600 dark:text-gray-300">Titulo da Obra</p>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                {titulo}
              </p>

              <p className="mb-3 font-semibold text-gray-600 dark:text-gray-300">Registrada em:</p>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                {date}
              </p>
            </CardBody>
          </Card>
          <Card style={{width: "100%"}}>
            <CardBody>
            <p className="mb-3 font-semibold text-gray-600 dark:text-gray-300">Descrição</p>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
              {descricao}
              </p>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardBody>
          <p className="mb-1 font-semibold text-gray-600 dark:text-gray-300">Imagem</p>
          <div className="flex flex-col items-center">
            <img style={{width: "90%"}} src={imgurl}/>
          </div>  
          </CardBody>
        </Card>
      </div>



    </>
  )
}

export default ObraInfo
