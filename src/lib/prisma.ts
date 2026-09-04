import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function makePrisma() {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  const adapter = new PrismaNeon({ connectionString })
  return new PrismaClient({ adapter } as never)
}

let prismaClient = globalForPrisma.prisma

function getPrisma() {
  if (!prismaClient) {
    prismaClient = makePrisma()
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaClient
    }
  }
  return prismaClient
}

// Keep importing server modules safe during builds that do not have a database
// connection configured. The connection is still required when a query runs.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = getPrisma()
    const value = client[property as keyof PrismaClient]
    return typeof value === 'function' ? value.bind(client) : value
  },
})
