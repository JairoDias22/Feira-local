import { useEffect, useState } from 'react'

// Hook customizado: anima um número subindo de 0 até "valorFinal" em
// "duracaoMs" milissegundos, usando requestAnimationFrame (a forma correta
// de fazer animações em JavaScript, mais suave que setInterval).
// Fica fora do componente NumeroImpacto para poder ser reaproveitado.
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
    // Função de limpeza: cancela a animação se o componente for desmontado
    // no meio do caminho, evitando atualizar estado de algo que já sumiu.
    return () => cancelAnimationFrame(frameId)
  }, [valorFinal, duracaoMs])

  return valor
}

// Números fixos do painel de impacto (dados de exemplo).
const NUMEROS = [
  { valor: 35, rotulo: 'Produtores cadastrados' },
  { valor: 128, rotulo: 'Produtos disponíveis' },
  { valor: 12, rotulo: 'Localidades atendidas' },
  { valor: 87, rotulo: 'Práticas sustentáveis registradas' },
]

// Componente pequeno só para poder chamar o hook useContador uma vez por
// número (hooks não podem ser chamados dentro de um .map diretamente).
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
