import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { useSearch } from '../context/SearchContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const { favoritos } = useFavorites()
  const { busca, setBusca } = useSearch()
  const { totalItens, setCarrinhoAberto } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  function irParaSecao(evento, ancora) {
    evento.preventDefault()
    setMenuAberto(false)
    // Corrige o bug: se não estivermos na página inicial, navega até lá
    // e só depois a rolagem até a seção acontece (ver ScrollToHash.jsx).
    navigate(`/${ancora}`)
  }

  function aoDigitarBusca(evento) {
    const valor = evento.target.value
    setBusca(valor)
    if (location.pathname !== '/') {
      navigate('/#produtos')
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
