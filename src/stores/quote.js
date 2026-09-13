import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { products } from '../data/products'

const STORAGE_KEY = 'cottage3d-quote'

export const useQuoteStore = defineStore('quote', () => {
  const items = ref([])

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) {
        items.value = parsed.map((item) => {
          const product = products.find((product) => product.id === item.id)
          // Refresh cached labels and asset URLs without changing quantities.
          return product ? { ...item, name: product.name, slug: product.slug, image: product.image } : item
        })
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
      }
    }
  } catch {
    items.value = []
  }

  const totalItems = computed(() => items.value.reduce((total, item) => total + item.quantity, 0))

  function add(product, quantity = 1) {
    const existing = items.value.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += quantity
      return
    }

    items.value.push({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      quantity,
    })
  }

  function setQuantity(id, quantity) {
    const item = items.value.find((current) => current.id === id)
    if (!item) return
    if (quantity <= 0) {
      remove(id)
      return
    }
    item.quantity = quantity
  }

  function remove(id) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  function clear() {
    items.value = []
  }

  watch(
    items,
    (value) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)),
    { deep: true },
  )

  return { items, totalItems, add, setQuantity, remove, clear }
})
