import axios from 'axios';

const API_URL = process.env.API_URL || 'https://captain.sapimu.au/dramabox/api/v1';
const TOKEN = process.env.AUTH_TOKEN;

const ALLOWED_PATHS = ['/foryou/', '/new/', '/rank/', '/search/', '/suggest/', '/classify', '/chapters/', '/watch/'];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const path = req.url.replace('/api', '');
  const [pathname, queryString] = path.split('?');
  
  if (!ALLOWED_PATHS.some(p => pathname.startsWith(p))) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (!TOKEN) {
    return res.status(500).json({ 
      error: 'Server configuration error',
      message: 'AUTH_TOKEN not configured. Please set environment variables in Vercel.'
    });
  }

  try {
    const url = `${API_URL}${pathname}${queryString ? '?' + queryString : ''}`;
    
    console.log('Proxying request:', {
      url,
      pathname,
      queryString,
      hasToken: !!TOKEN
    });
    
    const response = await axios.get(url, {
      headers: { 
        Authorization: `Bearer ${TOKEN}`,
        'User-Agent': 'DramaBox-Proxy/1.0'
      }
    });
    
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ 
      error: 'For full API access, check Telegram @sapitokenbot',
      details: err.message
    });
  }
}
