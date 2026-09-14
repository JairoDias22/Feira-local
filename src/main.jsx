import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import './index.css'

// Ponto de entrada da aplicação: é aqui que o React "planta" toda a árvore
// de componentes dentro da <div id="root"> do index.html.
//
// A ordem dos Providers importa apenas quando um contexto depende de outro
// (não é o caso aqui) — cada um deles envolve toda a aplicação para que
// qualquer componente, em qualquer nível, consiga acessar favoritos, busca
// e carrinho através dos hooks useFavorites(), useSearch() e useCart().
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <SearchProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </SearchProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
