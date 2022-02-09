import React from 'react'

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import InfoCard from '../components/Cards/InfoCard'
import { Card, CardBody } from '@windmill/react-ui'
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import logo from "../icons/AutorCoin.png"

function ObraInfo() {
  return (
    <>
      <PageTitle>Minha Obra</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <div style={{width: "100%"}}>
          <Card style={{width: "100%"}} className="mb-8">
            <CardBody>
            <p className="mb-3 font-semibold text-gray-600 dark:text-gray-300">Titulo da Obra</p>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Autor Hash
              </p>
            </CardBody>
          </Card>
          <Card style={{width: "100%"}}>
            <CardBody>
            <p className="mb-3 font-semibold text-gray-600 dark:text-gray-300">Descrição</p>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam non est ac est hendrerit venenatis. Donec eget tempor metus. Nulla non ante eu nibh facilisis tristique. Proin vitae accumsan augue, sed ornare ex. Morbi mollis tortor maximus diam blandit egestas. Nam eget mauris non mauris convallis consequat. Maecenas eget urna eu dolor pharetra ultrices. Morbi bibendum purus ut urna feugiat pharetra. Sed hendrerit, massa ac scelerisque accumsan, augue velit sodales nibh, id egestas arcu eros sit amet risus. Phasellus elementum augue sit amet ligula eleifend egestas. Aenean nibh odio, sodales id maximus vel, finibus sed magna. Sed ut metus luctus, faucibus magna sed, vestibulum tellus. Pellentesque a suscipit turpis. Praesent vulputate in risus non cursus. Aenean tempus ut urna at finibus.
              </p>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardBody>
          <p className="mb-1 font-semibold text-gray-600 dark:text-gray-300">Imagem</p>
          <div className="flex flex-col items-center">
            <img style={{width: "90%"}} src={logo}/>
          </div>  
          </CardBody>
        </Card>
      </div>



    </>
  )
}

export default ObraInfo
