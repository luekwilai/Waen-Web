// Seed script to initialize data
const { seedInitialData } = require('./src/lib/db');

async function main() {
  console.log('Seeding initial data...');
  await seedInitialData();
  console.log('Done!');
  process.exit(0);
}

main().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
