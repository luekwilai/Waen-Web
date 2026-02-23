const fs = require('fs');

const databaseUrl = 'postgresql://neondb_owner:npg_0ORiNP5dBnkK@ep-shiny-shadow-a1fquwui-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

fs.writeFileSync('.env.local', `DATABASE_URL=${databaseUrl}`, 'utf8');
console.log('DATABASE_URL set in .env.local');
