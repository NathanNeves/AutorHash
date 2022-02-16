import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))
const RegistrarObra = lazy(() => import('../pages/RegistrarObra'))
const Loja = lazy(() => import('../pages/Loja'))
const MeusAnuncios = lazy(() => import('../pages/MeusAnuncios'))
const ComprarAutorcoin = lazy(() => import('../pages/ComprarAutorcoin'))
const Obra = lazy(() => import('../pages/ObraInfo'))
const Anuncio = lazy(() => import('../pages/AnuncioInfo'))
const CriarAnuncio = lazy(() => import('../pages/CriarAnuncio'))
const EditarAnuncio = lazy(() => import('../pages/EditarAnuncio'))



const routes = [
  {
    path: '/dashboard', 
    component: Dashboard, 
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/cards',
    component: Cards,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
  {
    path: '/registrarObra',
    component: RegistrarObra,
  },
  {
    path: '/loja',
    component: Loja,
  },
  {
    path: '/meusAnuncios',
    component: MeusAnuncios,
  },
  {
    path: '/comprarAutorcoin',
    component: ComprarAutorcoin,
  },
  {
    path: `/obra/:id`,
    component: Obra,
  },
  {
    path: '/anuncio/:id',
    component: Anuncio,
  },
  {
    path: '/criaranuncio',
    component: CriarAnuncio,
  },
  {
    path: '/editaranuncio',
    component: EditarAnuncio,
  },
]

export default routes
