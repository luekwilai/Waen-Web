const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function exportData() {
  console.log('Exporting data...');
  
  try {
    const data = {
      users: await prisma.user.findMany(),
      projects: await prisma.project.findMany(),
      packages: await prisma.package.findMany(),
      inquiries: await prisma.inquiry.findMany()
    };
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `data-export-${timestamp}.json`;
    
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`Data exported to ${filename}`);
    console.log(`Users: ${data.users.length}`);
    console.log(`Projects: ${data.projects.length}`);
    console.log(`Packages: ${data.packages.length}`);
    console.log(`Inquiries: ${data.inquiries.length}`);
    
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

exportData().catch((error) => {
  console.error(error);
  process.exit(1);
});
