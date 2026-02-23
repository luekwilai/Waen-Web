const fs = require('fs');
const path = require('path');

// Create the proper DATABASE_URL
const databaseUrl = 'postgresql://neondb_owner:npg_0ORiNP5dBnkK@ep-shiny-shadow-a1fquwui-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

// Write to .env.local with proper encoding
fs.writeFileSync(path.join(__dirname, '../.env.local'), `DATABASE_URL=${databaseUrl}`, { encoding: 'utf8' });

console.log('DATABASE_URL has been set in .env.local');
console.log('URL length:', databaseUrl.length);
