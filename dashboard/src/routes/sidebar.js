/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Meu Painel', // name that appear in Sidebar
  },
  {
    path: '/app/registrarObra',
    icon: 'FormsIcon', 
    name: 'Registrar Obra', 
  },
  {
    path: '/app/loja',
    icon: 'CartIcon',
    name: 'Loja',
  },
  {
    path: '/app/meusAnuncios',
    icon: 'CardsIcon',
    name: 'Meus Anúncios',
  },
]

export default routes
