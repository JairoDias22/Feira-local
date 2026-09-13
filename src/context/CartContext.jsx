import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [itens, setItens] = useState([])
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)

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
    setCarrinhoAberto(true)
  }

  function removerDoCarrinho(id) {
    setItens((atual) => atual.filter((item) => item.id !== id))
  }

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
