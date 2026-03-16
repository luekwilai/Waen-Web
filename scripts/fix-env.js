const fs = require('fs');
const path = require('path');

const databaseUrl = process.env.DATABASE_URL || process.argv[2];

if (!databaseUrl) {
  throw new Error('Provide DATABASE_URL via environment variable or first CLI argument');
}

fs.writeFileSync(path.join(__dirname, '../.env.local'), `DATABASE_URL=${databaseUrl}`, { encoding: 'utf8' });

console.log('DATABASE_URL has been set in .env.local');
console.log('URL length:', databaseUrl.length);
