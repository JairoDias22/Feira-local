// Seção de destaque no topo da página inicial: título, texto de
// apresentação e os dois botões de ação principal. Não tem estado nem
// lógica — é só conteúdo estático (por isso nenhum useState/useEffect aqui).
export default function Hero() {
  return (
    <section id="topo" className="hero">
      <div className="container">
        <span className="tag-stamp">ODS 2 · Fome Zero e Agricultura Sustentável</span>
        <h1 className="hero-title">
          Da roça <span className="hero-title-accent">pra sua mesa</span>, sem atravessador.
        </h1>
        <p className="hero-lede">
          A FeiraLocal conecta quem planta a quem cozinha. Descubra produtores da sua região,
          o que está na época e leve pra casa alimentos frescos, justos e sustentáveis.
        </p>
        <div className="hero-actions">
          <a href="#produtos" className="btn btn-market">Explorar produtos</a>
          <a href="#produtores" className="btn btn-market-outline">Conhecer produtores</a>
        </div>
      </div>
    </section>
  )
}
