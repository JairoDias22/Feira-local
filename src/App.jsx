import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CartModal from './components/CartModal.jsx'
import ScrollToHash from './components/ScrollToHash.jsx'
import Home from './pages/Home.jsx'
import Favoritos from './pages/Favoritos.jsx'
import ProdutorPerfil from './pages/ProdutorPerfil.jsx'

// Componente raiz: define a estrutura fixa de toda página (Header + Footer +
// modal do carrinho) e, no meio, troca o conteúdo principal de acordo com a
// rota atual — essa troca sem recarregar o navegador é o que caracteriza
// uma SPA (Single Page Application).
export default function App() {
  return (
    <>
      {/* Link de acessibilidade: permite pular o menu e ir direto ao
          conteúdo usando apenas o teclado (tecla Tab). */}
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>

      <Header />

      {/* Cuida da rolagem até a seção certa (#produtos, #sobre etc.),
          inclusive quando a navegação parte de outra página. */}
      <ScrollToHash />

      <main id="conteudo-principal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/produtor/:id" element={<ProdutorPerfil />} />
        </Routes>
      </main>

      <Footer />

      {/* Renderizado fora do <main> e sempre presente no DOM: o próprio
          componente decide se aparece ou não, com base no estado
          "carrinhoAberto" do CartContext. */}
      <CartModal />
    </>
  )
}
