import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { saltHashPassword } from "@/utils";
import { signInSchema } from "@/lib/zod";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: { username: {}, password: {} },
      async authorize(credentials) {
        try {
          const { username, password } =
            await signInSchema.parseAsync(credentials);
          const pwHash = await saltHashPassword(password);

          const user = await prisma.user.findUnique({
            where: { name: username, passhash: pwHash },
          });
          if (!user) throw new Error("User Not Found");
          return user;
        } catch {
          // if (error instanceof ZodError)
          return null;
        }
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
});
