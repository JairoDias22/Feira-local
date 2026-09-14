// Número de WhatsApp usado como reserva, caso um produtor ainda não tenha
// um número cadastrado em public/data/produtores.json.
// Formato: código do país + DDD + número, só dígitos.
export const NUMERO_WHATSAPP_PADRAO = '5599999999999'

export function montarLinkWhatsApp(itensCarrinho, numeroWhatsApp) {
  const linhas = itensCarrinho.map(
    (item) => `• ${item.quantidade}x ${item.nome} (${item.preco})`
  )
  const mensagem = [
    'Olá! Vim pela FeiraLocal e gostaria de comprar:',
    '',
    ...linhas,
    '',
    'Pode me ajudar a fechar esse pedido?',
  ].join('\n')

  const numero = numeroWhatsApp || NUMERO_WHATSAPP_PADRAO
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
}

export function montarLinkContatoDireto(nomeProdutor, numeroWhatsApp) {
  const mensagem = `Olá, ${nomeProdutor}! Vim pela FeiraLocal e queria saber mais sobre seus produtos.`
  const numero = numeroWhatsApp || NUMERO_WHATSAPP_PADRAO
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
}
