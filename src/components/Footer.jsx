// Rodapé simples, presente em todas as páginas (é renderizado direto no
// App.jsx, fora das rotas).
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="brand-word brand-word--footer">Feira<em>Local</em></p>
        <p className="footer-text">
          Plataforma para valorização da agricultura familiar, conectando produtores e
          consumidores. Projeto desenvolvido para a disciplina Desenvolvimento Web
          (UEMA/Uemanet), ligado ao ODS 2 — Fome Zero e Agricultura Sustentável.
        </p>
        <hr className="footer-rule" />
        <p className="footer-copy">FeiraLocal · Projeto acadêmico · Nota 2</p>
      </div>
    </footer>
  )
}
