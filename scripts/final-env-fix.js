const fs = require('fs');
const path = require('path');

const url = process.env.DATABASE_URL || process.argv[2];

if (!url) {
  throw new Error('Provide DATABASE_URL via environment variable or first CLI argument');
}

const envPath = path.join(__dirname, '../.env.local');
fs.writeFileSync(envPath, `DATABASE_URL=${url}`, 'utf8');

const content = fs.readFileSync(envPath, 'utf8');
console.log('Written URL length:', url.length);
console.log('File content length:', content.length);
console.log('URL correct:', content === `DATABASE_URL=${url}`);
console.log('Verification:', content.startsWith('DATABASE_URL='));
