const { PrismaClient } = require('@prisma/client');
const { PrismaNeon } = require('@prisma/adapter-neon');
require('dotenv').config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function checkData() {
  console.log('Checking current database contents...');
  
  try {
    const userCount = await prisma.user.count();
    const projectCount = await prisma.project.count();
    const packageCount = await prisma.package.count();
    const inquiryCount = await prisma.inquiry.count();
    
    console.log(`Users: ${userCount}`);
    console.log(`Projects: ${projectCount}`);
    console.log(`Packages: ${packageCount}`);
    console.log(`Inquiries: ${inquiryCount}`);
    
    if (projectCount > 0) {
      const projects = await prisma.project.findMany({ take: 3 });
      console.log('\nSample projects:');
      projects.forEach(p => console.log(`- ${p.title} (${p.category})`));
    }
    
    if (packageCount > 0) {
      const packages = await prisma.package.findMany({ take: 3 });
      console.log('\nSample packages:');
      packages.forEach(p => console.log(`- ${p.name}: ${p.price} THB`));
    }
    
  } catch (error) {
    console.error('Check failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

checkData().catch((error) => {
  console.error(error);
  process.exit(1);
});
