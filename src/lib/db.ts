// Simple JSON-based storage for quick development
// Can be replaced with Prisma/Database later

import fs from 'fs/promises'
import path from 'path'
import bcrypt from 'bcryptjs'

const DATA_DIR = path.join(process.cwd(), 'data')
const USERS_FILE = path.join(DATA_DIR, 'users.json')
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json')
const PACKAGES_FILE = path.join(DATA_DIR, 'packages.json')
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json')

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch (e) {
    // Directory exists
  }
}

async function readJsonFile<T>(filePath: string, defaultValue: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return defaultValue
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

// Users
export async function getUsers(): Promise<any[]> {
  return readJsonFile(USERS_FILE, [])
}

export async function findUserByEmail(email: string) {
  const users = await getUsers()
  return users.find((u: any) => u.email === email)
}

export async function createUser(userData: any) {
  const users = await getUsers()
  const hashedPassword = await bcrypt.hash(userData.password, 10)
  const newUser = {
    id: Date.now().toString(),
    ...userData,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  }
  users.push(newUser)
  await writeJsonFile(USERS_FILE, users)
  return newUser
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword)
}

// Projects
export async function getProjects(): Promise<any[]> {
  return readJsonFile(PROJECTS_FILE, [])
}

export async function createProject(projectData: any) {
  const projects = await getProjects()
  const newProject = {
    id: Date.now().toString(),
    ...projectData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  projects.push(newProject)
  await writeJsonFile(PROJECTS_FILE, projects)
  return newProject
}

export async function updateProject(id: string, projectData: any) {
  const projects = await getProjects()
  const index = projects.findIndex((p: any) => p.id === id)
  if (index === -1) return null
  
  projects[index] = {
    ...projects[index],
    ...projectData,
    updatedAt: new Date().toISOString()
  }
  await writeJsonFile(PROJECTS_FILE, projects)
  return projects[index]
}

export async function deleteProject(id: string) {
  const projects = await getProjects()
  const filtered = projects.filter((p: any) => p.id !== id)
  await writeJsonFile(PROJECTS_FILE, filtered)
  return true
}

// Packages
export async function getPackages(): Promise<any[]> {
  return readJsonFile(PACKAGES_FILE, [])
}

export async function createPackage(packageData: any) {
  const packages = await getPackages()
  const newPackage = {
    id: Date.now().toString(),
    ...packageData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  packages.push(newPackage)
  await writeJsonFile(PACKAGES_FILE, packages)
  return newPackage
}

export async function updatePackage(id: string, packageData: any) {
  const packages = await getPackages()
  const index = packages.findIndex((p: any) => p.id === id)
  if (index === -1) return null
  
  packages[index] = {
    ...packages[index],
    ...packageData,
    updatedAt: new Date().toISOString()
  }
  await writeJsonFile(PACKAGES_FILE, packages)
  return packages[index]
}

export async function deletePackage(id: string) {
  const packages = await getPackages()
  const filtered = packages.filter((p: any) => p.id !== id)
  await writeJsonFile(PACKAGES_FILE, filtered)
  return true
}

// Inquiries
export async function getInquiries(): Promise<any[]> {
  return readJsonFile(INQUIRIES_FILE, [])
}

export async function createInquiry(inquiryData: any) {
  const inquiries = await getInquiries()
  const newInquiry = {
    id: Date.now().toString(),
    ...inquiryData,
    status: 'NEW',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  inquiries.unshift(newInquiry)
  await writeJsonFile(INQUIRIES_FILE, inquiries)
  return newInquiry
}

export async function updateInquiry(id: string, inquiryData: any) {
  const inquiries = await getInquiries()
  const index = inquiries.findIndex((i: any) => i.id === id)
  if (index === -1) return null
  
  inquiries[index] = {
    ...inquiries[index],
    ...inquiryData,
    updatedAt: new Date().toISOString()
  }
  await writeJsonFile(INQUIRIES_FILE, inquiries)
  return inquiries[index]
}

export async function deleteInquiry(id: string) {
  const inquiries = await getInquiries()
  const filtered = inquiries.filter((i: any) => i.id !== id)
  await writeJsonFile(INQUIRIES_FILE, filtered)
  return true
}

// Seed initial data
export async function seedInitialData() {
  await ensureDataDir()
  
  // Create admin user if not exists
  const users = await getUsers()
  if (users.length === 0) {
    await createUser({
      email: 'admin@waenweb.com',
      name: 'Admin',
      password: 'admin123',
      role: 'ADMIN'
    })
    console.log('Admin user created: admin@waenweb.com / admin123')
  }
  
  // Create default packages if not exists
  const packages = await getPackages()
  if (packages.length === 0) {
    const defaultPackages = [
      {
        name: 'Landing Page',
        nameEn: 'Landing Page',
        price: 8900,
        description: 'เว็บไซต์ Landing Page โดดเด่น รองรับทุกอุปกรณ์',
        duration: '7-14 วัน',
        isPopular: false,
        isActive: true,
        features: ['ออกแบบ UI/UX สวยงาม', 'รองรับมือถือ & แท็บเล็ต', 'ฟอร์มติดต่อ + Google Maps', 'SEO มาตรฐาน', 'SSL Certificate ฟรี']
      },
      {
        name: 'Business Website',
        nameEn: 'Business Website',
        price: 15900,
        description: 'เว็บไซต์ธุรกิจครบวงจร พร้อมระบบจัดการ',
        duration: '14-21 วัน',
        isPopular: true,
        isActive: true,
        features: ['หน้าเว็บสูงสุด 7 หน้า', 'ระบบ CMS จัดการเนื้อหา', 'ระบบ Blog & News', 'รองรับหลายภาษา', 'Google Analytics', 'แก้ไขฟรี 3 ครั้ง']
      },
      {
        name: 'E-Commerce',
        nameEn: 'E-Commerce',
        price: 29900,
        description: 'ร้านค้าออนไลน์ครบวงจร พร้อมระบบชำระเงิน',
        duration: '21-30 วัน',
        isPopular: false,
        isActive: true,
        features: ['ระบบสินค้า & สต็อก', 'ตะกร้าสินค้า & Checkout', 'ระบบชำระเงิน (PromptPay, Credit)', 'ระบบสมาชิก & ประวัติการสั่งซื้อ', 'ระบบจัดการคำสั่งซื้อ', 'SSL & Security สูงสุด']
      }
    ]
    
    for (const pkg of defaultPackages) {
      await createPackage(pkg)
    }
    console.log('Default packages created')
  }
}
