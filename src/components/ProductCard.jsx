import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { useCart } from '../context/CartContext.jsx'

// Cartão reutilizável de um produto. É usado em três lugares diferentes:
// catálogo geral (Produtos), lista de favoritos e perfil do produtor —
// por isso vale a pena manter esse componente pequeno e sem lógica extra.
export default function ProductCard({ produto }) {
  const { alternarFavorito, ehFavorito } = useFavorites()
  const { adicionarAoCarrinho } = useCart()
  const favoritado = ehFavorito(produto.id)

  return (
    <article className="product-card">
      {/* Botão de favoritar: alterna entre coração vazio/cheio a cada clique. */}
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
      {/* Nome do produtor vira link para o perfil dele quando temos o
          produtorId (produtos vindos do favoritos.json antigo, sem esse
          campo, ainda funcionam — só não ficam clicáveis). */}
      {produto.produtorId ? (
        <Link to={`/produtor/${produto.produtorId}`} className="product-producer product-producer--link">
          {produto.produtor}
        </Link>
      ) : (
        <p className="product-producer">{produto.produtor}</p>
      )}
      <button
        type="button"
        className="add-cart-btn"
        onClick={() => adicionarAoCarrinho(produto)}
        aria-label={`Adicionar ${produto.nome} ao carrinho`}
      >
        🛒 Adicionar
      </button>
    </article>
  )
}
