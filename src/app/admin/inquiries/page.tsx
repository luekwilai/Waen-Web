import { InquiriesPageClient } from "@/components/admin/inquiries-page-client"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/get-session"
import { getAdminInquiries } from "@/lib/queries"

export default async function AdminInquiriesPage() {
  const [session, inquiries] = await Promise.all([
    getSession(),
    getAdminInquiries(),
  ])

  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/admin/login")
  }

  const initialInquiries = inquiries.map((inquiry) => ({
    ...inquiry,
    createdAt: new Date(inquiry.createdAt).toISOString(),
  }))

  return <InquiriesPageClient initialInquiries={initialInquiries} />
}
