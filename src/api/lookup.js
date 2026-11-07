import fetch from 'node-fetch';

const WORLD_IDS = {
  Solis: 46,
  Luna: 30,
  Bera: 1,
  Scania: 19,
  Kronos: 45,
  Chronos: 45,
  Hyperion: 70,
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { name, world } = req.query;

    if (!name || !world) {
      return res.status(400).json({ error: 'Missing required parameters: name and world' });
    }

    const worldId = WORLD_IDS[world];
    if (!worldId) {
      return res.status(400).json({
        error: `Invalid world: ${world}. Must be one of: ${Object.keys(WORLD_IDS).join(', ')}`,
      });
    }

    const region = ['Solis', 'Luna'].includes(world) ? 'eu' : 'na';

    const apiUrl = `https://www.nexon.com/api/maplestory/no-auth/ranking/v2/${region}?type=world&id=${worldId}&page_index=1&character_name=${encodeURIComponent(
      name
    )}`;

    console.log('➡️ Fetching Nexon API:', apiUrl);

    const apiResponse = await fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      },
    });

    const text = await apiResponse.text();
    console.log('⬅️ Raw Nexon Response:', text);

    if (!apiResponse.ok) {
      return res.status(apiResponse.status).json({
        error: `Nexon API returned status ${apiResponse.status}`,
        details: text,
      });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      console.error('❌ Failed to parse Nexon API JSON:', parseErr);
      return res.status(500).json({
        error: 'Invalid JSON returned from Nexon API',
        raw: text,
      });
    }

    const character = data?.ranks?.[0] || data?.rankingList?.[0];
    if (!character) {
      return res.status(404).json({ error: `Character '${name}' not found on ${world}` });
    }

    const avatarUrl = character.characterImgURL || character.avatar_url || character.character_image || '';
    let avatarBase64 = '';

    if (avatarUrl) {
      try {
        const imgResp = await fetch(avatarUrl, {
          headers: {
            Referer: 'https://www.nexon.com/',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
          },
        });
        if (imgResp.ok) {
          const buffer = await imgResp.arrayBuffer();
          const base64 = Buffer.from(buffer).toString('base64');
          const contentType = imgResp.headers.get('content-type') || 'image/png';
          avatarBase64 = `data:${contentType};base64,${base64}`;
        }
      } catch (e) {
        console.error('Failed to convert image to base64 in lookup handler:', e);
      }
    }

    const normalizedData = {
      ranks: [
        {
          characterName: character.character_name || character.characterName,
          avatarImgUrl: avatarUrl,
          characterImgURL: avatarUrl,
          avatarBase64: avatarBase64,
          level: character.level || character.lv || 0,
          jobName: character.job_name || character.jobName || character.job || 'Unknown',
          worldName: world,
        }
      ]
    };

    res.status(200).json(normalizedData);
  } catch (err) {
    console.error('💥 Handler error:', err);
    res.status(500).json({
      error: 'Unexpected server error',
      message: err.message,
      stack: err.stack,
    });
  }
}
