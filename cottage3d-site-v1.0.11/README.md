# Cottage 3D — v1.0.7

Site em Vue 3 + JavaScript para a Cottage 3D.

## Rodar localmente

```bash
npm install
npm run dev -- --host
```

## Build

```bash
npm run build
```

## Novidades v1.0.7

- O antigo bloco gigante **SCROLL DOWN** foi removido. A Home agora usa um **footer reveal**: ao chegar no fim, o rodapé é revelado por baixo do conteúdo, no estilo da referência Motion.
- **Floating Target Cursor** agora funciona em toda a experiência desktop. Ele permanece como alvo durante a navegação e se expande ao entrar em links, botões, campos e áreas com `data-cursor`.
- **Magnetic Filings** foi movido para o topo da Home e existe somente no Hero da página Cottage 3D.
- A frase “Ideias deixam de ser apenas digitais...” agora usa **typewriter em looping**: digita, pausa, apaga e recomeça continuamente.
- Mantidas as funções das versões anteriores: pixel curtain, loading overlay, countdown, contador de itens, WhatsApp, catálogo, mega menu, Instagram shimmer e animações de scroll/layout.

## Observação sobre Motion

Alguns exemplos visuais citados no Motion.dev fazem parte do Motion+. O projeto mantém a linguagem e os comportamentos desejados com componentes próprios em Vue + `motion-v`, sem exigir token/licença Motion+.
