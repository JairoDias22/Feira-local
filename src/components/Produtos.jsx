import { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard.jsx'
import { useSearch } from '../context/SearchContext.jsx'

export default function Produtos() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [categoria, setCategoria] = useState('Todas')
  // A busca em si não mora aqui: vem do SearchContext, porque o campo de
  // texto está no Header, fora deste componente.
  const { busca } = useSearch()

  // Busca os produtos uma única vez, quando o componente é montado
  // (array de dependências vazio = executa só na primeira renderização).
  // Isso simula o consumo de uma API: os dados vêm de um arquivo JSON
  // externo via fetch(), e não de uma lista fixa dentro do código.
  useEffect(() => {
    fetch('/data/produtos.json')
      .then((resposta) => resposta.json())
      .then((dados) => setProdutos(dados))
      .catch((erro) => console.error('Erro ao carregar produtos:', erro))
      .finally(() => setCarregando(false))
  }, [])

  // Monta a lista de categorias disponíveis a partir dos próprios produtos
  // carregados (em vez de escrever "Legumes, Frutas..." fixo no código).
  // useMemo evita recalcular isso em toda renderização, só quando a lista
  // de produtos mudar de fato.
  const categorias = useMemo(() => {
    const unicas = new Set(produtos.map((p) => p.categoria))
    return ['Todas', ...unicas]
  }, [produtos])

  // Filtro combinado: o produto só aparece se bater com a busca E com a
  // categoria selecionada ao mesmo tempo.
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
