import { createContext, useContext, useEffect, useState } from 'react'

// Context API do React: permite compartilhar o estado "favoritos" entre
// componentes distantes na árvore (ex: Header, ProductCard, página de
// Favoritos) sem precisar passar props manualmente por cada nível.
const FavoritesContext = createContext(null)

// Chave usada para salvar os favoritos no localStorage do navegador.
const STORAGE_KEY = 'feiralocal:favoritos'

export function FavoritesProvider({ children }) {
  // Estado inicial: tenta recuperar favoritos já salvos no navegador.
  // Isso é o que faz a lista sobreviver a um F5 ou fechar o navegador.
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const salvos = localStorage.getItem(STORAGE_KEY)
      return salvos ? JSON.parse(salvos) : []
    } catch (erro) {
      console.error('Não foi possível ler os favoritos salvos:', erro)
      return []
    }
  })

  // Sempre que a lista de favoritos mudar, salva de novo no localStorage.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos))
  }, [favoritos])

  // Adiciona o produto se ele ainda não for favorito, ou remove se já for
  // (comportamento de "toggle", usado no botão de coração dos cards).
  function alternarFavorito(produto) {
    setFavoritos((atual) => {
      const jaExiste = atual.some((item) => item.id === produto.id)
      if (jaExiste) {
        return atual.filter((item) => item.id !== produto.id)
      }
      return [...atual, produto]
    })
  }

  function ehFavorito(id) {
    return favoritos.some((item) => item.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favoritos, alternarFavorito, ehFavorito }}>
      {children}
    </FavoritesContext.Provider>
  )
}

// Hook de conveniência: em vez de importar useContext + FavoritesContext em
// cada componente, basta chamar useFavorites().
export function useFavorites() {
  const contexto = useContext(FavoritesContext)
  if (!contexto) {
    throw new Error('useFavorites precisa ser usado dentro de um FavoritesProvider')
  }
  return contexto
}
