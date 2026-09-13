import { useEffect, useState } from 'react'

// Coordenadas aproximadas de Bacabal - MA
const LATITUDE = -4.2286
const LONGITUDE = -44.7917
const URL_API = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current_weather=true`

export default function Clima() {
  const [clima, setClima] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    let cancelado = false

    async function buscarClima() {
      try {
        setCarregando(true)
        setErro(null)
        const resposta = await fetch(URL_API)
        if (!resposta.ok) {
          throw new Error(`Erro ao consultar a API (status ${resposta.status})`)
        }
        const dados = await resposta.json()
        if (!cancelado) {
          setClima(dados.current_weather)
        }
      } catch (e) {
        if (!cancelado) {
          setErro('Não foi possível carregar o clima agora.')
        }
      } finally {
        if (!cancelado) {
          setCarregando(false)
        }
      }
    }

    buscarClima()
    return () => {
      cancelado = true
    }
  }, [])

  return (
    <div className="clima-card">
      <p className="clima-eyebrow">Clima agora em Bacabal – MA</p>
      {carregando && <p className="clima-status">Consultando a previsão…</p>}
      {erro && <p className="clima-status clima-erro">{erro}</p>}
      {clima && !carregando && !erro && (
        <div className="clima-dados">
          <span className="clima-temperatura">{Math.round(clima.temperature)}°C</span>
          <span className="clima-vento">Vento: {Math.round(clima.windspeed)} km/h</span>
        </div>
      )}
      <p className="clima-fonte">Dados via Open-Meteo (API pública, consumida com Fetch API)</p>
    </div>
  )
}
