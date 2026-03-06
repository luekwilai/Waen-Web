import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import authConfig from "./auth.config"
import { verifyRecaptchaToken } from "./recaptcha"
import { verifyTotpToken } from "./totp"

const config: NextAuthConfig = {
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        totpToken: { label: "TOTP", type: "text" },
        recaptchaToken: { label: "reCAPTCHA", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const isRecaptchaValid = await verifyRecaptchaToken(String(credentials.recaptchaToken || ""))
        if (!isRecaptchaValid) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        if (user.twoFactorEnabled) {
          const totpToken = String(credentials.totpToken || "")

          if (!user.twoFactorSecret || !verifyTotpToken({ token: totpToken, secret: user.twoFactorSecret })) {
            return null
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth(config)

export const authOptions = config
