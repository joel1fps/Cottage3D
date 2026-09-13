import mario from '../assets/products/chaveiro-mario.webp'
import colete2 from '../assets/products/chaveiro-colete-refletivo-2.webp'
import camisa from '../assets/products/chaveiro-camisa-brasil.webp'
import letra from '../assets/products/letra-personalizada.webp'
import buu from '../assets/products/majin-buu.webp'
import spider from '../assets/products/homem-aranha.webp'
import chaveiro from '../assets/products/chaveiro-personalizado.webp'
import charizard from '../assets/products/charizard.webp'
import zoro from '../assets/products/zoro.webp'
import sonic1 from '../assets/products/sonic-1.webp'
import sonic2 from '../assets/products/sonic-2.webp'
import sonic3 from '../assets/products/sonic-3.webp'
import colete from '../assets/products/chaveiro-colete-refletivo.webp'
import direito from '../assets/products/chaveiro-direito.webp'

export const products = [
  {
    id: 'chaveiro-mario', slug: 'chaveiro-mario', name: 'Chaveiro Mario',
    category: 'Chaveiros', image: mario, eyebrow: 'Chaveiro temático', priceLabel: 'Sob consulta',
    description: 'Chaveiro em impressão 3D inspirado no Mario. Consulte tamanho, quantidade e disponibilidade.',
    details: ['Impressão 3D', 'Acabamento colorido', 'Quantidade sob consulta'], featured: false,
  },
  {
    id: 'chaveiro-camisa-brasil', slug: 'chaveiro-camisa-brasil', name: 'Chaveiro camisa do Brasil',
    category: 'Chaveiros', image: camisa, eyebrow: 'Chaveiro personalizado', priceLabel: 'Sob consulta',
    description: 'Chaveiro em formato de camisa nas cores do Brasil. Consulte opções de nome, número, tamanho e quantidade.',
    details: ['Personalização sob consulta', 'Cores do Brasil', 'Quantidade sob consulta'], featured: false,
  },
  {
    id: 'letra-personalizada',
    slug: 'letra-personalizada',
    name: 'Letra personalizada',
    category: 'Personalizados',
    image: letra,
    eyebrow: 'Peça personalizada',
    priceLabel: 'Sob consulta',
    description:
      'Peça decorativa personalizada em impressão 3D. O nome, a composição visual, as cores e o tamanho são definidos no orçamento.',
    details: ['Personalização sob medida', 'Cores sob consulta', 'Tamanho sob consulta'],
    featured: true,
  },
  {
    id: 'majin-buu',
    slug: 'majin-buu-dragon-ball-z',
    name: 'Majin Buu — Dragon Ball Z',
    category: 'Colecionáveis',
    image: buu,
    eyebrow: 'Colecionável',
    priceLabel: 'Sob consulta',
    description:
      'Peça colecionável em impressão 3D inspirada em Majin Buu. Consulte disponibilidade, dimensões e opções de acabamento.',
    details: ['Colecionável', 'Acabamento colorido', 'Disponibilidade sob consulta'],
    featured: true,
  },
  {
    id: 'homem-aranha',
    slug: 'homem-aranha',
    name: 'Homem-Aranha',
    category: 'Colecionáveis',
    image: spider,
    eyebrow: 'Colecionável',
    priceLabel: 'Sob consulta',
    description:
      'Peça colecionável em impressão 3D inspirada no Homem-Aranha. Consulte tamanho, disponibilidade e acabamento.',
    details: ['Colecionável', 'Impressão 3D', 'Tamanho sob consulta'],
    featured: true,
  },
  {
    id: 'chaveiro-personalizado',
    slug: 'chaveiro-personalizado',
    name: 'Chaveiro personalizado',
    category: 'Chaveiros',
    image: chaveiro,
    eyebrow: 'Pequenos detalhes',
    priceLabel: 'Sob consulta',
    description:
      'Chaveiro produzido em impressão 3D. Modelos, cores e quantidade podem ser combinados diretamente no orçamento.',
    details: ['Personalizável', 'Opções de cor', 'Quantidade sob consulta'],
    featured: false,
  },
  {
    id: 'charizard',
    slug: 'charizard-pokemon',
    name: 'Charizard — Pokémon',
    category: 'Colecionáveis',
    image: charizard,
    eyebrow: 'Colecionável',
    priceLabel: 'Sob consulta',
    description:
      'Peça colecionável em impressão 3D inspirada em Charizard. Consulte disponibilidade, dimensões e acabamento.',
    details: ['Colecionável', 'Impressão 3D', 'Disponibilidade sob consulta'],
    featured: true,
  },
  {
    id: 'zoro',
    slug: 'zoro-one-piece',
    name: 'Zoro — One Piece',
    category: 'Colecionáveis',
    image: zoro,
    eyebrow: 'Colecionável',
    priceLabel: 'Sob consulta',
    description:
      'Peça colecionável em impressão 3D inspirada em Zoro. Consulte tamanho, disponibilidade e opções de acabamento.',
    details: ['Colecionável', 'Acabamento colorido', 'Tamanho sob consulta'],
    featured: true,
  },
  {
    id: 'sonic',
    slug: 'sonic-the-hedgehog',
    name: 'Sonic — Sonic the Hedgehog',
    category: 'Colecionáveis',
    image: sonic1,
    images: [sonic1, sonic2, sonic3],
    eyebrow: 'Colecionável',
    priceLabel: 'Sob consulta',
    description:
      'Peça colecionável em impressão 3D inspirada em Sonic, com acabamento colorido. Consulte dimensões, disponibilidade e prazo de produção.',
    details: ['Colecionável', 'Galeria com 3 fotos reais', 'Disponibilidade sob consulta'],
    featured: true,
  },
  {
    id: 'chaveiro-colete-refletivo',
    slug: 'chaveiro-colete-refletivo',
    name: 'Chaveiro colete refletivo',
    category: 'Chaveiros',
    image: colete,
    images: [colete, colete2],
    eyebrow: 'Chaveiro temático',
    priceLabel: 'Sob consulta',
    description:
      'Chaveiro em impressão 3D no formato de colete refletivo, produzido em duas cores. Consulte quantidade, tamanho e disponibilidade.',
    details: ['Chaveiro em impressão 3D', 'Peça em duas cores', 'Quantidade sob consulta'],
    featured: false,
  },
  {
    id: 'chaveiro-direito',
    slug: 'chaveiro-direito',
    name: 'Chaveiro Direito',
    category: 'Chaveiros',
    image: direito,
    eyebrow: 'Chaveiro temático',
    priceLabel: 'Sob consulta',
    description:
      'Chaveiro em impressão 3D com composição temática de Direito e símbolo da balança. Consulte cores, quantidade e disponibilidade.',
    details: ['Chaveiro temático', 'Impressão 3D', 'Cores sob consulta'],
    featured: false,
  },
]

export const categories = ['Todos', ...new Set(products.map((product) => product.category))]
