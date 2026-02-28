export default async function handler(req, res) {
  res.json({
    hasToken: !!process.env.AUTH_TOKEN,
    tokenLength: process.env.AUTH_TOKEN?.length || 0,
    tokenPrefix: process.env.AUTH_TOKEN?.substring(0, 10) || 'none',
    apiUrl: process.env.API_URL || 'not set',
    nodeEnv: process.env.NODE_ENV
  });
}
