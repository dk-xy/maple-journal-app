/**
 * Converts an image URL to a base64 Data URL so it can be stored in localStorage.
 * Handles server-side proxying, client-side blob conversion, and canvas fallback.
 */
export async function urlToBase64(url) {
  if (!url || typeof url !== 'string' || url.startsWith('data:')) {
    return url
  }

  // 1. Try server proxy endpoint if available (bypasses browser CORS)
  try {
    const proxyRes = await fetch(`/api/image-to-base64?url=${encodeURIComponent(url)}`)
    if (proxyRes.ok) {
      const data = await proxyRes.json()
      if (data && data.base64) {
        return data.base64
      }
    }
  } catch {
    // Server proxy not reachable or failed, proceed to client-side methods
  }

  // 2. Try client-side fetch -> Blob -> Data URL
  try {
    const res = await fetch(url)
    if (res.ok) {
      const blob = await res.blob()
      return await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
    }
  } catch {
    // Direct fetch might be blocked by CORS
  }

  // 3. Try Image -> Canvas
  try {
    return await new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = img.naturalWidth || img.width
          canvas.height = img.naturalHeight || img.height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0)
          resolve(canvas.toDataURL('image/png'))
        } catch (e) {
          reject(e)
        }
      }
      img.onerror = reject
      img.src = url
    })
  } catch {
    // If all conversion attempts fail, keep original URL
    return url
  }
}

