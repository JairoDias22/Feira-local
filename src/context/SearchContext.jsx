import { createContext, useContext, useState } from 'react'

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
