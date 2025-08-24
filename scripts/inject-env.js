#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Lire le fichier env.js
const envFilePath = path.join(__dirname, '../build/env.js');
let envContent = fs.readFileSync(envFilePath, 'utf8');

// Remplacer les placeholders par les vraies valeurs
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5500';
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5500';

envContent = envContent.replace('%REACT_APP_API_URL%', API_URL);
envContent = envContent.replace('%REACT_APP_SOCKET_URL%', SOCKET_URL);

// Écrire le fichier modifié
fs.writeFileSync(envFilePath, envContent);

console.log('✅ Variables d\'environnement injectées avec succès !');
console.log(`API_URL: ${API_URL}`);
console.log(`SOCKET_URL: ${SOCKET_URL}`);