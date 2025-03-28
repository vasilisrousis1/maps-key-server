#!/bin/bash
# Simple deployment script for the Maps API Key server

# Detect environment from argument or prompt
if [ -z "$1" ]; then
  echo "Please specify environment (local, dev, prod):"
  read ENV
else
  ENV=$1
fi

# Load corresponding .env file if it exists
ENV_FILE=".env.${ENV}"
if [ -f "$ENV_FILE" ]; then
  echo "Loading environment from $ENV_FILE"
  export $(grep -v '^#' $ENV_FILE | xargs)
else
  echo "Using default .env file"
  export $(grep -v '^#' .env | xargs)
fi

case $ENV in
  local)
    echo "Starting server locally..."
    npm run dev
    ;;
    
  dev)
    echo "Deploying to development environment..."
    # Add your development deployment logic here
    # For example:
    # scp -r ./* user@dev-server:/path/to/deployment/
    echo "Not implemented: Add your development deployment commands"
    ;;
    
  prod)
    echo "Deploying to production environment..."
    # Add your production deployment logic here
    # For example:
    # scp -r ./* user@prod-server:/path/to/deployment/
    echo "Not implemented: Add your production deployment commands"
    ;;
    
  *)
    echo "Unknown environment: $ENV"
    echo "Valid options: local, dev, prod"
    exit 1
    ;;
esac