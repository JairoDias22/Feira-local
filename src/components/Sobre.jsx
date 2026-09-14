import Clima from './Clima.jsx'

// Seção "O projeto": texto explicando a situação-problema e o ODS,
// ao lado do card de clima (que consome uma API externa real).
export default function Sobre() {
  return (
    <section id="sobre" className="section section-sobre">
      <div className="container sobre-grid">
        <div>
          <p className="section-eyebrow">O projeto</p>
          <h2 className="section-title">Comida justa começa com quem planta</h2>
          <p className="section-text">
            Muitos pequenos produtores da agricultura familiar têm dificuldade para vender
            diretamente aos consumidores, dependendo de intermediários que reduzem sua renda.
          </p>
          <p className="section-text">
            A FeiraLocal nasce para encurtar essa distância, em linha com o{' '}
            <strong>ODS 2 — Fome Zero e Agricultura Sustentável</strong>.
          </p>
        </div>
        <Clima />
      </div>
    </section>
  )
}
