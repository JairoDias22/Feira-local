import { createContext, useContext, useEffect, useState } from 'react'

const FavoritesContext = createContext(null)

const STORAGE_KEY = 'feiralocal:favoritos'

export function FavoritesProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const salvos = localStorage.getItem(STORAGE_KEY)
      return salvos ? JSON.parse(salvos) : []
    } catch (erro) {
      console.error('Não foi possível ler os favoritos salvos:', erro)
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos))
  }, [favoritos])

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

export function useFavorites() {
  const contexto = useContext(FavoritesContext)
  if (!contexto) {
    throw new Error('useFavorites precisa ser usado dentro de um FavoritesProvider')
  }
  return contexto
}
