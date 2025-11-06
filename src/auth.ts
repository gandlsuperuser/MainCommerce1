import NextAuth from "next-auth"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import bcrypt from "bcryptjs"
import { z } from "zod"

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentialsSchema.parse(credentials)

          const user = await prisma.user.findUnique({
            where: { email },
          })

          if (!user || !user.password) {
            return null
          }

          // Check if email is verified (optional - uncomment if you want to require email verification)
          // if (!user.emailVerified) {
          //   throw new Error("Please verify your email before signing in")
          // }

          const isPasswordValid = await bcrypt.compare(password, user.password)

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          }
        } catch (error) {
          return null
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        // Find or create user in database for OAuth
        let user = await prisma.user.findUnique({
          where: { email: profile.email },
        })

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name,
              image: profile.picture,
              role: "CUSTOMER",
              emailVerified: new Date(),
            },
          })
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        }
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      async profile(profile) {
        // Find or create user in database for OAuth
        let user = await prisma.user.findUnique({
          where: { email: profile.email || "" },
        })

        if (!user && profile.email) {
          user = await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name || profile.login,
              image: profile.avatar_url,
              role: "CUSTOMER",
              emailVerified: new Date(),
            },
          })
        }

        return {
          id: user?.id || "",
          email: user?.email || profile.email || "",
          name: user?.name || profile.name || profile.login,
          image: user?.image || profile.avatar_url,
          role: user?.role || "CUSTOMER",
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role || "CUSTOMER"
        token.email = user.email
        token.name = user.name
        token.picture = user.image
      }

      if (trigger === "update" && session) {
        token = { ...token, ...session }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = (token.role as "CUSTOMER" | "ADMIN") || "CUSTOMER"
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.picture as string
      }
      return session
    },
  },
})

