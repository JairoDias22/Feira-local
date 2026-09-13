const PRATICAS = [
  { icone: '♻️', titulo: 'Compostagem', texto: 'Restos orgânicos viram adubo, reduzindo o descarte e fortalecendo o solo.' },
  { icone: '🧺', titulo: 'Redução do desperdício', texto: 'Venda direta do produtor ao consumidor diminui perdas na distribuição.' },
  { icone: '💧', titulo: 'Uso responsável da água', texto: 'Técnicas de irrigação eficientes preservam um recurso essencial.' },
]

export default function Sustentabilidade() {
  return (
    <section className="section section-sustentabilidade">
      <div className="container">
        <div className="section-head">
          <p className="section-eyebrow">Boas práticas</p>
          <h2 className="section-title">Agricultura que respeita a terra</h2>
        </div>
        <div className="praticas-grid">
          {PRATICAS.map((pratica) => (
            <article className="practice-card" key={pratica.titulo}>
              <span className="practice-icon" aria-hidden="true">{pratica.icone}</span>
              <h3>{pratica.titulo}</h3>
              <p>{pratica.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
