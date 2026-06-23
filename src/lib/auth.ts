import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";

import { env } from "@/env";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (rawCredentials) => {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        if (email !== env.AUTH_ADMIN_EMAIL) {
          return null;
        }

        const isValid = await compare(password, env.AUTH_ADMIN_PASSWORD_HASH);
        if (!isValid) {
          return null;
        }

        return {
          id: "admin",
          name: "Administrator",
          email: env.AUTH_ADMIN_EMAIL,
          role: "admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = (user as { role?: string }).role ?? "admin";
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub ?? "admin";
        session.user.role = (token.role as string | undefined) ?? "admin";
      }
      return session;
    },
    authorized: async ({ auth, request }) => {
      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
      if (!isAdminRoute) {
        return true;
      }

      const isLoginRoute = request.nextUrl.pathname === "/admin/login";
      if (isLoginRoute) {
        return true;
      }

      return !!auth;
    },
  },
  secret: env.NEXTAUTH_SECRET,
});
