import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
app.use(cors()) // enable CORS so Vite dev server + browser can call this

// Map world names to Nexon world IDs used in client
const WORLD_MAP = {
  Solis: 46,
  Luna: 30,
  Bera: 1,
  Scania: 19,
  Kronos: 45,
  Chronos: 45,
  Hyperion: 70
}

/**
 * Proxy endpoint to convert an external image URL to a base64 Data URL
 * Client calls: /api/image-to-base64?url=https://...
 */
app.get('/api/image-to-base64', async (req, res) => {
  try {
    const { url } = req.query
    if (!url) {
      return res.status(400).json({ error: 'Missing url query parameter' })
    }

    const imgResp = await fetch(url, {
      headers: {
        Referer: 'https://www.nexon.com/',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    })

    if (!imgResp.ok) {
      return res.status(imgResp.status).json({ error: 'Failed to fetch image from remote host' })
    }

    const buffer = await imgResp.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    const contentType = imgResp.headers.get('content-type') || 'image/png'
    return res.json({ base64: `data:${contentType};base64,${base64}` })
  } catch (err) {
    console.error('Image proxy error:', err)
    return res.status(500).json({ error: 'Image proxy failed', details: String(err) })
  }
})

/**
 * Proxy endpoint for Nexon character lookup:
 * Client calls: /api/lookup?name=Artificiel&world=Solis
 */
app.get('/api/lookup', async (req, res) => {
  try {
    const { name, world } = req.query
    if (!name || !world) {
      return res.status(400).json({ error: 'Missing name or world query parameter' })
    }

    // Determine region based on world
    const region = ['Solis', 'Luna'].includes(world) ? 'eu' : 'na'

    // allow either world name (mapped) or numeric id
    const worldId = /^[0-9]+$/.test(world) ? world : (WORLD_MAP[world] || world)
    const apiUrl = `https://www.nexon.com/api/maplestory/no-auth/ranking/v2/${region}?type=world&id=${encodeURIComponent(
      worldId
    )}&page_index=1&character_name=${encodeURIComponent(name)}`

    const resp = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Referer: 'https://www.nexon.com/',
        Host: 'www.nexon.com',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/json, text/plain, */*'
      }
    })

    const text = await resp.text()
    if (!resp.ok) {
      return res.status(resp.status).type('text').send(text)
    }

    // try to parse JSON
    let json
    try {
      json = JSON.parse(text)
    } catch {
      return res.type('text').send(text)
    }

    // Pre-convert avatar image to base64 so it can be stored directly in localStorage
    const firstRank = json?.ranks?.[0] || json?.rankingList?.[0]
    const avatarUrl = firstRank?.characterImgURL || firstRank?.avatar_url || ''
    if (avatarUrl && typeof avatarUrl === 'string') {
      try {
        const imgResp = await fetch(avatarUrl, {
          headers: {
            Referer: 'https://www.nexon.com/',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          }
        })
        if (imgResp.ok) {
          const buffer = await imgResp.arrayBuffer()
          const base64 = Buffer.from(buffer).toString('base64')
          const contentType = imgResp.headers.get('content-type') || 'image/png'
          const base64DataUri = `data:${contentType};base64,${base64}`
          firstRank.avatarBase64 = base64DataUri
        }
      } catch (imgErr) {
        console.error('Failed to convert character image to base64:', imgErr)
      }
    }

    return res.json(json)
  } catch (err) {
    console.error('Proxy error:', err)
    return res.status(500).json({ error: 'Proxy failed', details: String(err) })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Lookup proxy server listening on port ${PORT}`)
})
