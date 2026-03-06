import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getSession } from "@/lib/get-session"
import { prisma } from "@/lib/prisma"

type SessionLikeUser = {
  id?: string
  email?: string | null
  name?: string | null
  role?: string
}

export function isAdminUser(user?: SessionLikeUser | null) {
  return user?.role === "ADMIN"
}

export async function requireAdminPageSession() {
  const session = await getSession()
  const user = session?.user as SessionLikeUser | undefined

  if (!user || !isAdminUser(user)) {
    redirect("/admin/login")
  }

  return { session, user }
}

export async function requireAdminApiSession() {
  const session = await auth()
  let user = session?.user as SessionLikeUser | undefined

  if (user?.email && !isAdminUser(user)) {
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    if (dbUser?.role === "ADMIN") {
      user = {
        id: user.id ?? dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role,
      }
    }
  }

  if (!user || !isAdminUser(user)) {
    return {
      session: null,
      user: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    }
  }

  return {
    session,
    user,
    response: null,
  }
}
