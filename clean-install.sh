#!/bin/bash

# Remove old files
rm -rf node_modules package-lock.json dist

# Clear npm cache
npm cache clean --force

# Install dependencies with strict security
npm install --legacy-peer-deps=false

# Run security audit
npm audit

# Build project
npm run build 