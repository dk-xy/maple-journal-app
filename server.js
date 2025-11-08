import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
app.use(cors()) // enable CORS so Vite dev server + browser can call this

// Map world names to Nexon world IDs used in client (extend as needed)
const WORLD_MAP = {
  Solis: 46,
  Luna: 30,
  Bera: 1,
  Scania: 19,
  Chronos: 45,
  Hyperion: 70
}

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

    // allow either world name (mapped) or numeric id
    const worldId = /^[0-9]+$/.test(world) ? world : (WORLD_MAP[world] || world)
    const apiUrl = `https://www.nexon.com/api/maplestory/no-auth/ranking/v2/eu?type=world&id=${encodeURIComponent(
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
      // forward status and body for better debugging
      return res.status(resp.status).type('text').send(text)
    }

    // try to parse JSON, but forward raw text if it isn't JSON
    try {
      const json = JSON.parse(text)
      return res.json(json)
    } catch {
      return res.type('text').send(text)
    }
  } catch (err) {
    console.error('Proxy error:', err)
    return res.status(500).json({ error: 'Proxy failed', details: String(err) })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Lookup proxy server listening on port ${PORT}`)
})