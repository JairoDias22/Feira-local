import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const { favoritos } = useFavorites()

  return (
    <header className="site-header">
      <nav className="navbar container">
        <Link className="navbar-brand" to="/" onClick={() => setMenuAberto(false)}>
          <span className="brand-word">Feira<em>Local</em></span>
        </Link>

        <button
          className="navbar-toggler"
          aria-expanded={menuAberto}
          aria-label="Abrir menu de navegação"
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          ☰
        </button>

        <ul className={`navbar-nav ${menuAberto ? 'aberto' : ''}`}>
          <li><a href="#sobre" onClick={() => setMenuAberto(false)}>O projeto</a></li>
          <li><a href="#produtos" onClick={() => setMenuAberto(false)}>Produtos</a></li>
          <li><a href="#produtores" onClick={() => setMenuAberto(false)}>Produtores</a></li>
          <li><a href="#estacao" onClick={() => setMenuAberto(false)}>Da estação</a></li>
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
