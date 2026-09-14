import { createContext, useContext, useState } from 'react'

// Estado global do carrinho de compras, acessível por qualquer componente
// através do hook useCart() (ver função no final do arquivo).
const CartContext = createContext(null)

export function CartProvider({ children }) {
  // Lista de produtos no carrinho, cada um com uma quantidade.
  const [itens, setItens] = useState([])
  // Controla se o modal do carrinho está visível na tela.
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)

  // Adiciona um produto ao carrinho. Se ele já estiver lá, só aumenta a
  // quantidade em 1 em vez de duplicar o item na lista.
  function adicionarAoCarrinho(produto) {
    setItens((atual) => {
      const existente = atual.find((item) => item.id === produto.id)
      if (existente) {
        return atual.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        )
      }
      return [...atual, { ...produto, quantidade: 1 }]
    })
    // Abre o carrinho automaticamente para dar feedback visual imediato.
    setCarrinhoAberto(true)
  }

  function removerDoCarrinho(id) {
    setItens((atual) => atual.filter((item) => item.id !== id))
  }

  // Soma ou subtrai 1 da quantidade de um item; se chegar a 0, remove da lista.
  function alterarQuantidade(id, delta) {
    setItens((atual) =>
      atual
        .map((item) => (item.id === id ? { ...item, quantidade: item.quantidade + delta } : item))
        .filter((item) => item.quantidade > 0)
    )
  }

  function limparCarrinho() {
    setItens([])
  }

  // Total de itens (somando quantidades), usado no badge do ícone do carrinho.
  const totalItens = itens.reduce((soma, item) => soma + item.quantidade, 0)

  return (
    <CartContext.Provider
      value={{
        itens,
        totalItens,
        carrinhoAberto,
        setCarrinhoAberto,
        adicionarAoCarrinho,
        removerDoCarrinho,
        alterarQuantidade,
        limparCarrinho,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const contexto = useContext(CartContext)
  if (!contexto) {
    throw new Error('useCart precisa ser usado dentro de um CartProvider')
  }
  return contexto
}
