let overlay = null
let motionDisabled = false

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function buildOverlay() {
  if (overlay) return overlay

  motionDisabled = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (motionDisabled) return null

  const tileSize = window.innerWidth < 720 ? 72 : 94
  const columns = Math.ceil(window.innerWidth / tileSize)
  const rows = Math.ceil(window.innerHeight / tileSize)
  const container = document.createElement('div')
  container.className = 'pixel-curtain'
  container.style.setProperty('--pixel-cols', columns)
  container.style.setProperty('--pixel-rows', rows)

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      const tile = document.createElement('span')
      tile.className = 'pixel-curtain-tile'
      const wave = (col + row) / Math.max(1, columns + rows - 2)
      const noise = (((col * 17 + row * 31) % 11) / 10 - 0.5) * 0.12
      tile.style.setProperty('--pixel-delay', `${Math.max(0, wave * 0.24 + noise)}s`)
      tile.style.setProperty('--pixel-reveal-delay', `${Math.max(0, (1 - wave) * 0.2 + noise)}s`)
      container.appendChild(tile)
    }
  }

  document.body.appendChild(container)
  overlay = container
  requestAnimationFrame(() => container.classList.add('is-covering'))
  return container
}

export async function coverWithPixels() {
  if (typeof window === 'undefined') return
  const current = buildOverlay()
  if (!current || motionDisabled) return
  await wait(510)
}

export async function revealPixelCurtain() {
  if (!overlay || motionDisabled) return
  const current = overlay
  current.classList.remove('is-covering')
  current.classList.add('is-revealing')
  await wait(500)
  current.remove()
  if (overlay === current) overlay = null
}
