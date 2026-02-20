import type { NextAuthConfig } from "next-auth"

const authSecret =
  process.env.AUTH_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  (process.env.NODE_ENV === "development" ? "waenweb-dev-auth-secret" : undefined)

const authConfig: NextAuthConfig = {
  secret: authSecret,
  providers: [],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as { role?: string }).role = token.role as string | undefined
      }
      return session
    },
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl

      if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        const user = auth?.user as { role?: string; email?: string } | undefined

        return Boolean(user && (user.role === "ADMIN" || user.email === "admin@waenweb.com"))
      }

      return true
    },
  },
}

export default authConfig
