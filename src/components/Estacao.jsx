import { useState } from 'react'

const ALIMENTOS_POR_MES = {
  Janeiro: ['🍇 Uva', '🍍 Abacaxi', '🍅 Tomate', '🥬 Alface'],
  Fevereiro: ['🍉 Melancia', '🥭 Manga', '🌽 Milho', '🥕 Cenoura'],
  Março: ['🍊 Laranja', '🍋 Limão', '🥬 Couve', '🧄 Alho'],
  Abril: ['🍎 Maçã', '🍐 Pera', '🥔 Batata', '🧅 Cebola'],
  Maio: ['🍈 Melão', '🍇 Uva', '🥬 Alface', '🌽 Milho'],
  Junho: ['🍊 Tangerina', '🍓 Morango', '🥕 Cenoura', '🧄 Alho'],
  Julho: ['🍇 Uva', '🍎 Maçã', '🥬 Couve', '🍅 Tomate'],
  Agosto: ['🍌 Banana', '🥭 Manga', '🍉 Melancia', '🍅 Tomate', '🥬 Alface', '🌽 Milho'],
  Setembro: ['🍍 Abacaxi', '🍋 Limão', '🥕 Cenoura', '🫘 Feijão-verde'],
  Outubro: ['🥭 Manga', '🍈 Melão', '🥬 Alface', '🍅 Tomate'],
  Novembro: ['🍇 Uva', '🍑 Pêssego', '🌽 Milho', '🥕 Cenoura'],
  Dezembro: ['🍒 Cereja', '🍉 Melancia', '🥬 Couve', '🍅 Tomate'],
}

const MESES = Object.keys(ALIMENTOS_POR_MES)
const MES_ATUAL = MESES[new Date().getMonth()]

export default function Estacao() {
  const [mesSelecionado, setMesSelecionado] = useState(MES_ATUAL)

  return (
    <section id="estacao" className="section section-estacao">
      <div className="container estacao-grid">
        <div>
          <p className="section-eyebrow">Calendário da roça</p>
          <h2 className="section-title">
            O que está na época em{' '}
            <select
              className="month-select"
              value={mesSelecionado}
              onChange={(evento) => setMesSelecionado(evento.target.value)}
              aria-label="Selecionar mês"
            >
              {MESES.map((mes) => (
                <option key={mes} value={mes}>{mes.toLowerCase()}</option>
              ))}
            </select>
          </h2>
          <p className="section-text">
            Comprar alimentos da estação custa menos, tem mais sabor e reduz o impacto ambiental.
          </p>
        </div>
        <ul className="season-list" aria-live="polite">
          {ALIMENTOS_POR_MES[mesSelecionado].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
