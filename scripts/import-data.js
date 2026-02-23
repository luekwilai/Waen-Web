const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function importData(filename) {
  console.log(`Importing data from ${filename}...`);
  
  try {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    
    // Import Users
    if (data.users && data.users.length > 0) {
      console.log('Importing users...');
      for (const user of data.users) {
        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name,
            password: user.password,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          },
          create: {
            id: user.id,
            email: user.email,
            name: user.name,
            password: user.password,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          }
        });
      }
      console.log(`Imported ${data.users.length} users`);
    }
    
    // Import Projects
    if (data.projects && data.projects.length > 0) {
      console.log('Importing projects...');
      for (const project of data.projects) {
        await prisma.project.upsert({
          where: { id: project.id },
          update: {
            title: project.title,
            category: project.category,
            description: project.description,
            desktopImage: project.desktopImage,
            mobileImage: project.mobileImage,
            websiteUrl: project.websiteUrl,
            sortOrder: project.sortOrder,
            isActive: project.isActive,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt
          },
          create: project
        });
      }
      console.log(`Imported ${data.projects.length} projects`);
    }
    
    // Import Packages
    if (data.packages && data.packages.length > 0) {
      console.log('Importing packages...');
      for (const pkg of data.packages) {
        await prisma.package.upsert({
          where: { id: pkg.id },
          update: {
            name: pkg.name,
            nameEn: pkg.nameEn,
            price: pkg.price,
            description: pkg.description,
            features: pkg.features,
            duration: pkg.duration,
            isPopular: pkg.isPopular,
            isActive: pkg.isActive,
            sortOrder: pkg.sortOrder,
            createdAt: pkg.createdAt,
            updatedAt: pkg.updatedAt
          },
          create: pkg
        });
      }
      console.log(`Imported ${data.packages.length} packages`);
    }
    
    // Import Inquiries
    if (data.inquiries && data.inquiries.length > 0) {
      console.log('Importing inquiries...');
      for (const inquiry of data.inquiries) {
        await prisma.inquiry.upsert({
          where: { id: inquiry.id },
          update: {
            name: inquiry.name,
            email: inquiry.email,
            phone: inquiry.phone,
            company: inquiry.company,
            packageId: inquiry.packageId,
            message: inquiry.message,
            status: inquiry.status,
            createdAt: inquiry.createdAt,
            updatedAt: inquiry.updatedAt
          },
          create: inquiry
        });
      }
      console.log(`Imported ${data.inquiries.length} inquiries`);
    }
    
    console.log('Import completed successfully!');
    
  } catch (error) {
    console.error('Import failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Get filename from command line argument
const filename = process.argv[2];
if (!filename) {
  console.error('Please provide the export file name: node import-data.js <filename>');
  process.exit(1);
}

importData(filename).catch((error) => {
  console.error(error);
  process.exit(1);
});
