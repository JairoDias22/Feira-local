import Hero from '../components/Hero.jsx'
import Sobre from '../components/Sobre.jsx'
import Produtos from '../components/Produtos.jsx'
import Produtores from '../components/Produtores.jsx'
import Estacao from '../components/Estacao.jsx'
import Sustentabilidade from '../components/Sustentabilidade.jsx'
import Impacto from '../components/Impacto.jsx'

// Página inicial (rota "/"): só organiza a ordem das seções na tela.
// Cada seção é responsável pelo próprio conteúdo e dados.
export default function Home() {
  return (
    <>
      <Hero />
      <Sobre />
      <Produtos />
      <Produtores />
      <Estacao />
      <Sustentabilidade />
      <Impacto />
    </>
  )
}
