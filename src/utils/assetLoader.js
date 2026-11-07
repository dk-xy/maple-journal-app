// Eagerly resolve asset paths at compile time with Vite's import.meta.glob
const symbolAssets = import.meta.glob('../assets/images/symbols/*.webp', { eager: true, import: 'default' })
const questAssets = import.meta.glob('../assets/images/quests/*.{webp,png}', { eager: true, import: 'default' })
const bossAssets = import.meta.glob('../assets/images/resizedBosses/*.webp', { eager: true, import: 'default' })
const serverIconAssets = import.meta.glob('../assets/icons/servers/*.png', { eager: true, import: 'default' })
const etcAssets = import.meta.glob('../assets/images/etc/*.{webp,png}', { eager: true, import: 'default' })

export function getSymbolImage(key) {
  if (!key) return ''
  const path = `../assets/images/symbols/${key}.webp`
  return symbolAssets[path] || `/src/assets/images/symbols/${key}.webp`
}

export function getQuestImage(key) {
  if (!key) return ''
  const pngPath = `../assets/images/quests/${key}.png`
  const webpPath = `../assets/images/quests/${key}.webp`
  return questAssets[pngPath] || questAssets[webpPath] || `/src/assets/images/quests/${key}.webp`
}

export function getBossImage(key) {
  if (!key) return ''
  const path = `../assets/images/resizedBosses/${key}.webp`
  return bossAssets[path] || `/src/assets/images/resizedBosses/${key}.webp`
}

export function getServerIcon(name) {
  if (!name) return ''
  const path = `../assets/icons/servers/${name}.png`
  return serverIconAssets[path] || ''
}

export function getEtcImage(name) {
  if (!name) return ''
  const pngPath = `../assets/images/etc/${name}.png`
  const webpPath = `../assets/images/etc/${name}.webp`
  return etcAssets[pngPath] || etcAssets[webpPath] || ''
}

/**
 * Preloads all static assets into browser cache in the background.
 * Running this once on app mount guarantees that when the user navigates
 * to any page/tab, images are already cached and display instantly with zero delay.
 */
let hasPreloaded = false
export function preloadAllAssets() {
  if (hasPreloaded) return
  hasPreloaded = true

  const allUrls = [
    ...Object.values(symbolAssets),
    ...Object.values(questAssets),
    ...Object.values(bossAssets),
    ...Object.values(serverIconAssets),
    ...Object.values(etcAssets)
  ]

  const runPreload = () => {
    allUrls.forEach(url => {
      if (url && typeof url === 'string') {
        const img = new Image()
        img.decoding = 'async'
        img.src = url
      }
    })
  }

  if (typeof window !== 'undefined') {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(runPreload)
    } else {
      setTimeout(runPreload, 200)
    }
  }
}

