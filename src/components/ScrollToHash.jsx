import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0 })
      return
    }
    const id = location.hash.replace('#', '')
    // Pequeno atraso para garantir que a página de destino (ex: Home)
    // já renderizou o elemento antes de tentar rolar até ele.
    const tempo = setTimeout(() => {
      const elemento = document.getElementById(id)
      if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth' })
      }
    }, 80)
    return () => clearTimeout(tempo)
  }, [location.pathname, location.hash])

  return null
}
