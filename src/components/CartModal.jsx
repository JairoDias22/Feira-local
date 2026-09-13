import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { montarLinkWhatsApp } from '../config.js'

export default function CartModal() {
  const { itens, totalItens, carrinhoAberto, setCarrinhoAberto, removerDoCarrinho, alterarQuantidade } = useCart()
  const [produtores, setProdutores] = useState([])

  useEffect(() => {
    fetch('/data/produtores.json')
      .then((resposta) => resposta.json())
      .then((dados) => setProdutores(dados))
      .catch((erro) => console.error('Erro ao carregar dados dos produtores:', erro))
  }, [])

  if (!carrinhoAberto) return null

  // Agrupa os itens do carrinho por produtor, já que a compra é finalizada
  // via WhatsApp direto com cada um — um pedido não pode misturar produtores.
  const grupos = itens.reduce((acc, item) => {
    const chave = item.produtorId ?? 'sem-produtor'
    if (!acc[chave]) acc[chave] = []
    acc[chave].push(item)
    return acc
  }, {})

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
            <p className="cart-aviso cart-aviso--topo">
              Seus produtos são de mais de um produtor? Sem problema — organizamos o pedido em
              grupos, um WhatsApp por produtor.
            </p>

            {Object.entries(grupos).map(([produtorId, itensDoGrupo]) => {
              const produtor = produtores.find((p) => String(p.id) === String(produtorId))
              const nomeProdutor = produtor?.nome || itensDoGrupo[0].produtor || 'Produtor'
              const totalGrupo = itensDoGrupo.reduce((soma, item) => soma + item.quantidade, 0)

              return (
                <div className="cart-grupo" key={produtorId}>
                  <p className="cart-grupo-titulo">Produtos de {nomeProdutor}</p>
                  <ul className="cart-lista">
                    {itensDoGrupo.map((item) => (
                      <li key={item.id} className="cart-item">
                        <span className="cart-item-emoji" aria-hidden="true">{item.emoji}</span>
                        <div className="cart-item-info">
                          <p className="cart-item-nome">{item.nome}</p>
                          <p className="cart-item-produtor">{item.preco}</p>
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

                  <a
                    className="btn btn-market cart-checkout-btn"
                    href={montarLinkWhatsApp(itensDoGrupo, produtor?.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 Comprar com {nomeProdutor} ({totalGrupo} {totalGrupo === 1 ? 'item' : 'itens'})
                  </a>
                </div>
              )
            })}

            <p className="cart-total">{totalItens} {totalItens === 1 ? 'item' : 'itens'} no total</p>

            <button
              type="button"
              className="btn btn-market-outline cart-continuar-btn"
              onClick={() => setCarrinhoAberto(false)}
            >
              Continuar comprando
            </button>
          </>
        )}
      </div>
    </div>
  )
}
