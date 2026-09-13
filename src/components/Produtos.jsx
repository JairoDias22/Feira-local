import { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard.jsx'

export default function Produtos() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todas')

  useEffect(() => {
    fetch('/data/produtos.json')
      .then((resposta) => resposta.json())
      .then((dados) => setProdutos(dados))
      .catch((erro) => console.error('Erro ao carregar produtos:', erro))
      .finally(() => setCarregando(false))
  }, [])

  const categorias = useMemo(() => {
    const unicas = new Set(produtos.map((p) => p.categoria))
    return ['Todas', ...unicas]
  }, [produtos])

  const produtosFiltrados = produtos.filter((produto) => {
    const combinaBusca = produto.nome.toLowerCase().includes(busca.toLowerCase())
    const combinaCategoria = categoria === 'Todas' || produto.categoria === categoria
    return combinaBusca && combinaCategoria
  })

  return (
    <section id="produtos" className="section section-produtos">
      <div className="container">
        <div className="section-head">
          <p className="section-eyebrow">Na banca hoje</p>
          <h2 className="section-title">Produtos em destaque</h2>
        </div>

        <div className="produtos-controles">
          <input
            type="search"
            className="produtos-busca"
            placeholder="Buscar produto (ex: tomate)"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
            aria-label="Buscar produto"
          />
          <div className="produtos-filtros">
            {categorias.map((c) => (
              <button
                key={c}
                type="button"
                className={`filtro-btn ${categoria === c ? 'filtro-ativo' : ''}`}
                onClick={() => setCategoria(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {carregando && <p className="produtos-status">Carregando produtos…</p>}

        {!carregando && produtosFiltrados.length === 0 && (
          <p className="produtos-status">Nenhum produto encontrado para essa busca.</p>
        )}

        <div className="produtos-grid">
          {produtosFiltrados.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      </div>
    </section>
  )
}
