const fs = require('fs');
const path = require('path');

// The correct URL without any line breaks
const url = 'postgresql://neondb_owner:npg_0ORiNP5dBnkK@ep-shiny-shadow-a1fquwui-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

// Write the file
const envPath = path.join(__dirname, '../.env.local');
fs.writeFileSync(envPath, `DATABASE_URL=${url}`, 'utf8');

// Verify
const content = fs.readFileSync(envPath, 'utf8');
console.log('Written URL length:', url.length);
console.log('File content length:', content.length);
console.log('URL correct:', content === `DATABASE_URL=${url}`);
console.log('Contains a1fquwui:', content.includes('a1fquwui'));
