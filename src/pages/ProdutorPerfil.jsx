import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'

export default function ProdutorPerfil() {
  const { id } = useParams()
  const [produtor, setProdutor] = useState(null)
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    setCarregando(true)
    Promise.all([
      fetch('/data/produtores.json').then((r) => r.json()),
      fetch('/data/produtos.json').then((r) => r.json()),
    ])
      .then(([produtores, todosProdutos]) => {
        const encontrado = produtores.find((p) => String(p.id) === id)
        setProdutor(encontrado || null)
        setProdutos(todosProdutos.filter((p) => String(p.produtorId) === id))
      })
      .catch((erro) => console.error('Erro ao carregar produtor:', erro))
      .finally(() => setCarregando(false))
  }, [id])

  if (carregando) {
    return (
      <section className="section section-perfil">
        <div className="container">
          <p className="produtos-status">Carregando produtor…</p>
        </div>
      </section>
    )
  }

  if (!produtor) {
    return (
      <section className="section section-perfil">
        <div className="container">
          <p className="produtos-status">Produtor não encontrado.</p>
          <Link to="/#produtores" className="btn btn-market-outline">Voltar para produtores</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section section-perfil">
      <div className="container">
        <Link to="/#produtores" className="perfil-voltar">← Voltar para produtores</Link>

        <div className="perfil-cabecalho">
          <div className="producer-avatar producer-avatar--grande" aria-hidden="true">👤</div>
          <div>
            <h1 className="section-title">{produtor.nome}</h1>
            <p className="producer-location">📍 {produtor.local}</p>
          </div>
        </div>

        <p className="section-text perfil-descricao">{produtor.descricao}</p>

        <h2 className="perfil-subtitulo">Produtos de {produtor.nome}</h2>
        {produtos.length === 0 ? (
          <p className="produtos-status">Esse produtor ainda não tem produtos cadastrados.</p>
        ) : (
          <div className="produtos-grid">
            {produtos.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
