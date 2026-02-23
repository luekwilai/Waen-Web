const { PrismaClient } = require('@prisma/client');
const { PrismaNeon } = require('@prisma/adapter-neon');
require('dotenv').config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function seedSampleData() {
  console.log('Seeding sample data...');
  
  try {
    // Sample Projects
    const projects = [
      {
        title: 'E-Commerce Platform',
        category: 'เว็บไซต์ขายของ',
        description: 'ร้านค้าออนไลน์พร้อมระบบชำระเงินและจัดการสินค้า',
        desktopImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
        mobileImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
        websiteUrl: 'https://example-store.com',
        sortOrder: 1,
        isActive: true
      },
      {
        title: 'Restaurant Website',
        category: 'ร้านอาหาร',
        description: 'เว็บไซต์ร้านอาหารพร้อมระบบจองโต๊ะและเมนูออนไลน์',
        desktopImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
        mobileImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
        websiteUrl: 'https://example-restaurant.com',
        sortOrder: 2,
        isActive: true
      },
      {
        title: 'Portfolio Website',
        category: 'พอร์ตโฟลิโอ',
        description: 'เว็บไซต์แสดงผลงานสำหรับดีไซเนอร์และฟรีแลนซ์',
        desktopImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
        mobileImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=80',
        websiteUrl: 'https://example-portfolio.com',
        sortOrder: 3,
        isActive: true
      }
    ];

    for (const project of projects) {
      await prisma.project.create({
        data: project
      });
    }
    console.log(`Created ${projects.length} projects`);

    // Sample Packages
    const packages = [
      {
        name: 'เว็บไซต์หน้าเดียว',
        nameEn: 'Landing Page',
        price: 15000,
        description: 'เว็บไซต์หน้าเดียวสำหรับโปรโมทสินค้าหรือบริการ',
        features: '✓ Design 1 หน้า\n✓ Responsive ทุกอุปกรณ์\n✓ SEO พื้นฐาน\n✓ ฟอร์มติดต่อ\n✓ ฟรีโฮสติ้ง 1 ปี',
        duration: '5-7 วัน',
        isPopular: false,
        isActive: true,
        sortOrder: 1
      },
      {
        name: 'เว็บไซต์บริษัท',
        nameEn: 'Corporate Website',
        price: 35000,
        description: 'เว็บไซต์บริษัทครบวงจรพร้อมหลายหน้า',
        features: '✓ Design 5-10 หน้า\n✓ Responsive ทุกอุปกรณ์\n✓ SEO เต็มรูปแบบ\n✓ ระบบจัดการเนื้อหา\n✓ ฟรีโฮสติ้ง 1 ปี',
        duration: '2-3 สัปดาห์',
        isPopular: true,
        isActive: true,
        sortOrder: 2
      },
      {
        name: 'ร้านค้าออนไลน์',
        nameEn: 'E-Commerce',
        price: 50000,
        description: 'ร้านค้าออนไลน์พร้อมระบบขายสินค้าครบวงจร',
        features: '✓ Design 10-15 หน้า\n✓ Responsive ทุกอุปกรณ์\n✓ ระบบตะกร้าสินค้า\n✓ ระบบชำระเงิน\n✓ ฟรีโฮสติ้ง 1 ปี',
        duration: '3-4 สัปดาห์',
        isPopular: false,
        isActive: true,
        sortOrder: 3
      }
    ];

    for (const pkg of packages) {
      await prisma.package.create({
        data: pkg
      });
    }
    console.log(`Created ${packages.length} packages`);

    // Sample Inquiries
    const inquiries = [
      {
        name: 'สมชาย ใจดี',
        email: 'somchai@example.com',
        phone: '0812345678',
        company: 'บริษัท เอ็กซ์แซมเพิล จำกัด',
        packageId: packages[1].id, // Corporate Website
        message: 'สนใจทำเว็บไซต์บริษัท ต้องการให้มีระบบลูกค้าสัมพันธ์ด้วย',
        status: 'NEW'
      },
      {
        name: 'มานี รักดี',
        email: 'manee@example.com',
        phone: '0898765432',
        company: 'ร้านอาหารของฉัน',
        packageId: packages[0].id, // Landing Page
        message: 'ต้องการเว็บไซต์สำหรับร้านอาหาร แสดงเมนูและจองโต๊ะ',
        status: 'NEW'
      }
    ];

    for (const inquiry of inquiries) {
      await prisma.inquiry.create({
        data: inquiry
      });
    }
    console.log(`Created ${inquiries.length} inquiries`);

    console.log('Sample data seeded successfully!');
    
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedSampleData().catch((error) => {
  console.error(error);
  process.exit(1);
});
