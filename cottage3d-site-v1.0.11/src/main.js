import { createApp } from 'vue'
import './styles/main.css'

async function bootstrap() {
  try {
    const [{ createPinia }, { default: App }, { default: router }] = await Promise.all([
      import('pinia'),
      import('./App.vue'),
      import('./router/index.js'),
    ])

    const app = createApp(App).use(createPinia()).use(router)
    await router.isReady()
    app.mount('#app')
  } catch (error) {
    document.querySelector('#boot-cover')?.remove()
    console.error('[Cottage 3D] Falha ao iniciar o site:', error)

    const app = document.querySelector('#app')
    if (app) {
      app.innerHTML = `
        <section class="boot-error">
          <div class="boot-error-card">
            <strong>Cottage 3D</strong>
            <h1>O site não conseguiu iniciar.</h1>
            <p>Abra o Console do navegador (F12 → Console) e confira o erro mostrado em vermelho.</p>
            <pre>${String(error?.message || error)}</pre>
          </div>
        </section>
      `
    }
  }
}

bootstrap()
