import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function Favoritos() {
  const { favoritos } = useFavorites()

  return (
    <section className="section section-favoritos">
      <div className="container">
        <div className="section-head">
          <p className="section-eyebrow">Sua lista</p>
          <h2 className="section-title">Produtos favoritos</h2>
        </div>

        {favoritos.length === 0 ? (
          <div className="favoritos-vazio">
            <p>Você ainda não favoritou nenhum produto.</p>
            <Link to="/" className="btn btn-market">Explorar produtos</Link>
          </div>
        ) : (
          <div className="produtos-grid">
            {favoritos.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
