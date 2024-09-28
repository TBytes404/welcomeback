import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SignInFormSchema } from "@/lib/zod";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { validate } from "@/util/auth";

export const config = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: { nickname: {}, password: {} },
      async authorize(credentials) {
        const validatedCredentials =
          await SignInFormSchema.safeParseAsync(credentials);
        if (!validatedCredentials.success) return null;
        const { nickname, password } = validatedCredentials.data;
        return validate(nickname, password);
      },
    }),
  ],
  // callbacks:{
  //  async authorized({auth}) {
  //       return !!auth
  //   },
  // },
  // pages: {
  //   signIn: "/login",
  // },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
