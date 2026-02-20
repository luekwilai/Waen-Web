const { seedInitialData } = require('./dist/lib/db.js');

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
