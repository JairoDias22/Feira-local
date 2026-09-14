import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Lista de produtores da plataforma, carregada via Fetch API. Cada card é
// um Link inteiro (não só o nome) para o perfil do produtor — clicar em
// qualquer parte do card leva para /produtor/:id.
export default function Produtores() {
  const [produtores, setProdutores] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    fetch('/data/produtores.json')
      .then((resposta) => resposta.json())
      .then((dados) => setProdutores(dados))
      .catch((erro) => console.error('Erro ao carregar produtores:', erro))
      .finally(() => setCarregando(false))
  }, [])

  return (
    <section id="produtores" className="section section-produtores">
      <div className="container">
        <div className="section-head">
          <p className="section-eyebrow section-eyebrow--light">Gente da terra</p>
          <h2 className="section-title section-title--light">Quem planta o que você come</h2>
        </div>

        {carregando && <p className="produtos-status produtos-status--light">Carregando produtores…</p>}

        <div className="produtores-grid">
          {produtores.map((produtor) => (
            <Link to={`/produtor/${produtor.id}`} className="producer-card producer-card--link" key={produtor.id}>
              <div className="producer-avatar" aria-hidden="true">👤</div>
              <h3>{produtor.nome}</h3>
              <p className="producer-location">📍 {produtor.local}</p>
              <p>{produtor.descricao}</p>
              <p className="producer-tags">{produtor.produtos}</p>
              <span className="producer-ver-mais">Ver perfil e produtos →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
