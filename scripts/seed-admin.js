const bcrypt = require("bcryptjs")
require("dotenv").config({ path: ".env.local" })
const { PrismaClient } = require("@prisma/client")
const { PrismaNeon } = require("@prisma/adapter-neon")

async function main() {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set")
  }

  const adapter = new PrismaNeon({ connectionString })
  const prisma = new PrismaClient({ adapter })
  const hashedPassword = await bcrypt.hash("admin123", 10)

  const admin = await prisma.user.upsert({
    where: { email: "admin@waenweb.com" },
    update: {
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
    create: {
      email: "admin@waenweb.com",
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  })

  console.log("Seeded admin user:", admin.email)
  await prisma.$disconnect()
}

main().catch(async (error) => {
  console.error("Seed failed:", error)
  process.exit(1)
})
