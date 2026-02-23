const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '.env.local' });

// Old database connection (you'll need to provide this temporarily)
const oldPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.OLD_DATABASE_URL // You'll need to set this temporarily
    }
  }
});

// New Neon database connection
const newPrisma = new PrismaClient();

async function migrateData() {
  console.log('Starting data migration...');
  
  try {
    // Migrate Users
    console.log('Migrating users...');
    const users = await oldPrisma.user.findMany();
    for (const user of users) {
      await newPrisma.user.create({
        data: {
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
    console.log(`Migrated ${users.length} users`);

    // Migrate Projects
    console.log('Migrating projects...');
    const projects = await oldPrisma.project.findMany();
    for (const project of projects) {
      await newPrisma.project.create({
        data: {
          id: project.id,
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
        }
      });
    }
    console.log(`Migrated ${projects.length} projects`);

    // Migrate Packages
    console.log('Migrating packages...');
    const packages = await oldPrisma.package.findMany();
    for (const pkg of packages) {
      await newPrisma.package.create({
        data: {
          id: pkg.id,
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
        }
      });
    }
    console.log(`Migrated ${packages.length} packages`);

    // Migrate Inquiries
    console.log('Migrating inquiries...');
    const inquiries = await oldPrisma.inquiry.findMany();
    for (const inquiry of inquiries) {
      await newPrisma.inquiry.create({
        data: {
          id: inquiry.id,
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone,
          company: inquiry.company,
          packageId: inquiry.packageId,
          message: inquiry.message,
          status: inquiry.status,
          createdAt: inquiry.createdAt,
          updatedAt: inquiry.updatedAt
        }
      });
    }
    console.log(`Migrated ${inquiries.length} inquiries`);

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    await oldPrisma.$disconnect();
    await newPrisma.$disconnect();
  }
}

migrateData().catch((error) => {
  console.error(error);
  process.exit(1);
});
