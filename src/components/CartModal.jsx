import { useCart } from '../context/CartContext.jsx'
import { montarLinkWhatsApp } from '../config.js'

export default function CartModal() {
  const { itens, totalItens, carrinhoAberto, setCarrinhoAberto, removerDoCarrinho, alterarQuantidade } = useCart()

  if (!carrinhoAberto) return null

  return (
    <div className="cart-overlay" onClick={() => setCarrinhoAberto(false)}>
      <div
        className="cart-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
        onClick={(evento) => evento.stopPropagation()}
      >
        <div className="cart-modal-header">
          <h2>Meu carrinho</h2>
          <button
            type="button"
            className="cart-close-btn"
            aria-label="Fechar carrinho"
            onClick={() => setCarrinhoAberto(false)}
          >
            ✕
          </button>
        </div>

        {itens.length === 0 ? (
          <p className="cart-vazio">Seu carrinho está vazio. Adicione produtos para continuar.</p>
        ) : (
          <>
            <ul className="cart-lista">
              {itens.map((item) => (
                <li key={item.id} className="cart-item">
                  <span className="cart-item-emoji" aria-hidden="true">{item.emoji}</span>
                  <div className="cart-item-info">
                    <p className="cart-item-nome">{item.nome}</p>
                    <p className="cart-item-produtor">{item.produtor} · {item.preco}</p>
                  </div>
                  <div className="cart-item-qtd">
                    <button type="button" aria-label={`Diminuir quantidade de ${item.nome}`} onClick={() => alterarQuantidade(item.id, -1)}>−</button>
                    <span>{item.quantidade}</span>
                    <button type="button" aria-label={`Aumentar quantidade de ${item.nome}`} onClick={() => alterarQuantidade(item.id, 1)}>+</button>
                  </div>
                  <button
                    type="button"
                    className="cart-item-remover"
                    aria-label={`Remover ${item.nome} do carrinho`}
                    onClick={() => removerDoCarrinho(item.id)}
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>

            <p className="cart-total">{totalItens} {totalItens === 1 ? 'item' : 'itens'} no carrinho</p>

            <div className="cart-acoes">
              <button
                type="button"
                className="btn btn-market-outline cart-continuar-btn"
                onClick={() => setCarrinhoAberto(false)}
              >
                Continuar comprando
              </button>
              <a
                className="btn btn-market cart-checkout-btn"
                href={montarLinkWhatsApp(itens)}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Comprar pelo WhatsApp
              </a>
            </div>
            <p className="cart-aviso">
              Ao comprar, você será redirecionado ao WhatsApp com a lista de produtos já preenchida, para combinar a compra direto com o produtor.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
