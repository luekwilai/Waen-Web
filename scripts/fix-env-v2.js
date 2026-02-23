const fs = require('fs');
const path = require('path');

// Build the URL step by step to avoid line breaks
const parts = [
  'postgresql://neondb_owner:npg_0ORiNP5dBnkK@ep-shiny-shadow-a1fquwui-pooler.',
  'ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
];

const databaseUrl = parts.join('');

// Write to .env.local with proper encoding
const envPath = path.join(__dirname, '../.env.local');
fs.writeFileSync(envPath, `DATABASE_URL=${databaseUrl}`, { encoding: 'utf8' });

console.log('DATABASE_URL has been set in .env.local');
console.log('URL length:', databaseUrl.length);

// Verify
const content = fs.readFileSync(envPath, 'utf8');
console.log('Verification:', content.includes('a1fquwui-pooler'));
