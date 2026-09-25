import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { useSearch } from '../context/SearchContext.jsx'
import { useCart } from '../context/CartContext.jsx'

// Cabeçalho fixo, presente em todas as páginas. Reúne busca, favoritos,
// carrinho e o menu de navegação — por isso depende de três Contexts
// diferentes (Favorites, Search e Cart).
export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const { favoritos } = useFavorites()
  const { busca, setBusca } = useSearch()
  const { totalItens, setCarrinhoAberto } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  // Usado pelos links do menu (O projeto, Produtos...). Em vez de deixar o
  // navegador tratar o href="#produtos" sozinho (que só funciona se já
  // estivermos na Home), navegamos manualmente com o React Router.
  function irParaSecao(evento, ancora) {
    evento.preventDefault()
    setMenuAberto(false)
    // Corrige o bug: se não estivermos na página inicial, navega até lá
    // e só depois a rolagem até a seção acontece (ver ScrollToHash.jsx).
    navigate(`/${ancora}`)
  }

   // Evento disparado a cada tecla digitada no campo de busca (onChange).
  function aoDigitarBusca(evento) {
    const valor = evento.target.value
    setBusca(valor)
    if (valor.trim() === '') return

    if (location.pathname !== '/') {
      // Ainda não está na Home: navega para lá, o ScrollToHash cuida
      // da rolagem inicial assim que a seção existir no DOM.
      navigate('/#produtos', { replace: true })
      return
    }

    // Já está na Home: rola direto para a seção. Não dá pra depender do
    // hash aqui, porque ele já pode estar em "#produtos" e não mudaria
    // de novo — o que faria o ScrollToHash não disparar.
    const secaoProdutos = document.getElementById('produtos')
    if (secaoProdutos) {
      secaoProdutos.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="site-header">
      <nav className="navbar container">
        <Link className="navbar-brand" to="/" onClick={() => setMenuAberto(false)}>
          <span className="brand-word">Feira<em>Local</em></span>
        </Link>

        <input
          type="search"
          className="header-busca"
          placeholder="Buscar produto…"
          value={busca}
          onChange={aoDigitarBusca}
          aria-label="Buscar produto"
        />

        <div className="header-acoes">
          <button
            type="button"
            className="cart-btn"
            aria-label="Abrir carrinho de compras"
            onClick={() => setCarrinhoAberto(true)}
          >
            🛒 {totalItens > 0 && <span className="badge-favoritos">{totalItens}</span>}
          </button>

          <button
            className="navbar-toggler"
            aria-expanded={menuAberto}
            aria-label="Abrir menu de navegação"
            onClick={() => setMenuAberto((aberto) => !aberto)}
          >
            ☰
          </button>
        </div>

        <ul className={`navbar-nav ${menuAberto ? 'aberto' : ''}`}>
          <li><a href="/#sobre" onClick={(e) => irParaSecao(e, '#sobre')}>O projeto</a></li>
          <li><a href="/#produtos" onClick={(e) => irParaSecao(e, '#produtos')}>Produtos</a></li>
          <li><a href="/#produtores" onClick={(e) => irParaSecao(e, '#produtores')}>Produtores</a></li>
          <li><a href="/#estacao" onClick={(e) => irParaSecao(e, '#estacao')}>Da estação</a></li>
          <li>
            <Link className="nav-link-favoritos" to="/favoritos" onClick={() => setMenuAberto(false)}>
              ♥ Favoritos {favoritos.length > 0 && <span className="badge-favoritos">{favoritos.length}</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
