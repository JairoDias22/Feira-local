import { useEffect, useState } from 'react'

function useContador(valorFinal, duracaoMs = 1200) {
  const [valor, setValor] = useState(0)

  useEffect(() => {
    let inicio = null
    let frameId

    function animar(timestamp) {
      if (inicio === null) inicio = timestamp
      const progresso = Math.min((timestamp - inicio) / duracaoMs, 1)
      setValor(Math.floor(progresso * valorFinal))
      if (progresso < 1) {
        frameId = requestAnimationFrame(animar)
      }
    }

    frameId = requestAnimationFrame(animar)
    return () => cancelAnimationFrame(frameId)
  }, [valorFinal, duracaoMs])

  return valor
}

const NUMEROS = [
  { valor: 35, rotulo: 'Produtores cadastrados' },
  { valor: 128, rotulo: 'Produtos disponíveis' },
  { valor: 12, rotulo: 'Localidades atendidas' },
  { valor: 87, rotulo: 'Práticas sustentáveis registradas' },
]

function NumeroImpacto({ valor, rotulo }) {
  const valorAnimado = useContador(valor)
  return (
    <div>
      <p className="impact-number">{valorAnimado}</p>
      <p className="impact-label">{rotulo}</p>
    </div>
  )
}

export default function Impacto() {
  return (
    <section className="section section-impacto">
      <div className="container">
        <div className="section-head">
          <p className="section-eyebrow section-eyebrow--light">Nosso impacto</p>
          <h2 className="section-title section-title--light">Números que a FeiraLocal já move</h2>
        </div>
        <div className="impacto-grid">
          {NUMEROS.map((item) => (
            <NumeroImpacto key={item.rotulo} valor={item.valor} rotulo={item.rotulo} />
          ))}
        </div>
      </div>
    </section>
  )
}
