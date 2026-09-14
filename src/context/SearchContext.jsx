import { createContext, useContext, useState } from 'react'

// Guarda o texto digitado na busca do Header, para que o componente
// Produtos (em outro lugar da árvore) consiga ler e filtrar a lista
// sem precisar que o campo de busca esteja dentro dele.
const SearchContext = createContext(null)

export function SearchProvider({ children }) {
  const [busca, setBusca] = useState('')
  return (
    <SearchContext.Provider value={{ busca, setBusca }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const contexto = useContext(SearchContext)
  if (!contexto) {
    throw new Error('useSearch precisa ser usado dentro de um SearchProvider')
  }
  return contexto
}
