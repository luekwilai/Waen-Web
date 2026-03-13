import { redirect } from "next/navigation"
import { getSession } from "@/lib/get-session"
import { getSiteSettings } from "@/lib/queries"
import { SettingsPageClient } from "@/components/admin/settings-page-client"

export default async function AdminSettingsPage() {
  const [session, settings] = await Promise.all([getSession(), getSiteSettings()])

  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/admin/login")
  }

  return <SettingsPageClient initialSettings={settings} />
}
