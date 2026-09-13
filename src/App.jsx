import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CartModal from './components/CartModal.jsx'
import ScrollToHash from './components/ScrollToHash.jsx'
import Home from './pages/Home.jsx'
import Favoritos from './pages/Favoritos.jsx'
import ProdutorPerfil from './pages/ProdutorPerfil.jsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>
      <Header />
      <ScrollToHash />
      <main id="conteudo-principal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/produtor/:id" element={<ProdutorPerfil />} />
        </Routes>
      </main>
      <Footer />
      <CartModal />
    </>
  )
}
