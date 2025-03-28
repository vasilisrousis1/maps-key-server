// maps-key-server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS to only allow requests from your domain
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : 'http://localhost:3000',
  methods: ['GET'],
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Set up rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { error: 'Too many requests, please try again later.' }
});

// Apply rate limiting to all routes
app.use(limiter);

// Endpoint to serve the Google Maps API key
app.get('/maps-key.json', (req, res) => {
  // Get the API key from environment variables
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }
  
  // Add cache headers to reduce unnecessary requests
  res.set('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
  
  // Return the API key
  res.json({ key: apiKey });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start the server
app.listen(PORT, () => {
  console.log(`API Key server running on port ${PORT}`);
});