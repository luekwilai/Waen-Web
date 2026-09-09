import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export default async function WpAdminEntryPage() {
  const session = await auth()
  const user = session?.user as { role?: string } | undefined

  if (user?.role === "ADMIN") {
    redirect("/admin/dashboard")
  }

  redirect("/admin/login")
}
