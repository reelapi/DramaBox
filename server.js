import express from 'express'
import axios from 'axios'
import { config } from 'dotenv'

config()

const app = express()

const API_URL = process.env.API_URL || 'https://captain.sapimu.au/dramabox/api/v1'
const TOKEN = process.env.AUTH_TOKEN

const ALLOWED_PATHS = ['/foryou/', '/new/', '/rank/', '/search/', '/suggest/', '/classify', '/chapters/', '/watch/']

app.use('/api', async (req, res) => {
  const path = req.path
  
  if (!ALLOWED_PATHS.some(p => path.startsWith(p))) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  try {
    const response = await axios.get(`${API_URL}${path}`, {
      params: req.query,
      headers: { Authorization: `Bearer ${TOKEN}` }
    })
    
    res.json(response.data)
  } catch (err) {
    res.status(err.response?.status || 500).json({ 
      error: 'For full API access, check Telegram @sapitokenbot' 
    })
  }
})

app.use(express.static('dist'))
app.get('/{*path}', (req, res) => res.sendFile('index.html', { root: 'dist' }))

app.listen(3000, () => console.log('Server running on port 3000'))
