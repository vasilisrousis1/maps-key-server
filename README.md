# Google Maps API Key Server

A simple, secure Express server for serving your Google Maps API key to your AEM EDS application.

## Why This Approach?

This server provides a secure way to use your Google Maps API key without exposing it in client-side code. Benefits include:

- **Security**: Your API key never appears in the browser source code
- **Key Management**: You can rotate or update your key in one place
- **Rate Limiting**: Built-in protection against API abuse
- **CORS Protection**: Only allows requests from your authorized domains

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on the template:
   ```
   cp .env.template .env
   ```
4. Add your Google Maps API key to the `.env` file
5. Update the `ALLOWED_ORIGINS` in the `.env` file to include your AEM domains

## Running Locally

```
npm run dev
```

The server will start on port 3001 (or the port specified in your `.env` file).

## Deployment Options

### Option 1: Standalone Server

Deploy this Express app to any Node.js hosting service like:
- Heroku
- Vercel
- Netlify Functions
- AWS Elastic Beanstalk

### Option 2: Serverless Function

Convert this to a serverless function for:
- AWS Lambda
- Azure Functions
- Google Cloud Functions
- Adobe I/O Runtime

### Option 3: Proxy in AEM Dispatcher

Configure your AEM Dispatcher to forward requests for `/maps-key.json` to this service.

## Using with AEM EDS

The map-locator component in your AEM EDS project already attempts to fetch the API key from `/api/maps-key.json`. You just need to ensure that requests to this endpoint are properly routed to this service.

For local development, you can:
1. Run this server on port 3001
2. Configure a proxy in your AEM project to forward requests to this server

For production, consider one of the deployment options above.
