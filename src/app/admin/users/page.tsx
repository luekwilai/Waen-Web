import { UsersPageClient } from "@/components/admin/users-page-client"
import { requireAdminPageSession } from "@/lib/admin-access"
import { prisma } from "@/lib/prisma"
import { sanitizeUser } from "@/lib/user-management"

export default async function AdminUsersPage() {
  const { user } = await requireAdminPageSession()

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  })

  const initialUsers = users.map((item) => ({
    ...sanitizeUser(item),
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }))

  return <UsersPageClient initialUsers={initialUsers} currentUserId={user.id ?? ""} />
}
