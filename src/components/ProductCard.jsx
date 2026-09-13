import { useFavorites } from '../context/FavoritesContext.jsx'

export default function ProductCard({ produto }) {
  const { alternarFavorito, ehFavorito } = useFavorites()
  const favoritado = ehFavorito(produto.id)

  return (
    <article className="product-card">
      <button
        type="button"
        className={`favorite-btn ${favoritado ? 'favorito-ativo' : ''}`}
        aria-pressed={favoritado}
        aria-label={favoritado ? `Remover ${produto.nome} dos favoritos` : `Adicionar ${produto.nome} aos favoritos`}
        onClick={() => alternarFavorito(produto)}
      >
        {favoritado ? '♥' : '♡'}
      </button>
      <span className="price-tag">{produto.preco}</span>
      <p className="product-thumb" aria-hidden="true">{produto.emoji}</p>
      <h3>{produto.nome}</h3>
      <p className="product-producer">{produto.produtor}</p>
    </article>
  )
}
