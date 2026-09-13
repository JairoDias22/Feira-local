// Número de WhatsApp da FeiraLocal para onde o pedido é enviado.
// Formato: código do país + DDD + número, só dígitos (sem espaços, +, ( ) ou -).
// Exemplo real: "5599999999999" (55 = Brasil, 99 = DDD, restante o número).
// TROQUE pelo número real da equipe/produtor antes de publicar.
export const NUMERO_WHATSAPP = '5599999999999'

export function montarLinkWhatsApp(itensCarrinho) {
  const linhas = itensCarrinho.map(
    (item) => `• ${item.quantidade}x ${item.nome} (${item.preco}) — ${item.produtor}`
  )
  const mensagem = [
    'Olá! Vim pela FeiraLocal e gostaria de comprar:',
    '',
    ...linhas,
    '',
    'Pode me ajudar a fechar esse pedido?',
  ].join('\n')

  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`
}
