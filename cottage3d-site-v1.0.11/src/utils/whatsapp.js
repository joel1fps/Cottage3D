import { siteConfig } from '../config/site'

export function getWhatsAppUrl(message) {
  const number = String(siteConfig.whatsappNumber || '').replace(/\D/g, '')
  const text = encodeURIComponent(String(message || '').trim())

  if (number) return `https://wa.me/${number}?text=${text}`
  return `https://wa.me/?text=${text}`
}
