import { prisma } from "@/lib/prisma";
import { hash, compare } from "bcrypt";

export async function register(nickname: string, password: string) {
  const user = await prisma.user
    .findUnique({
      where: { nickname },
      select: { id: true },
    })
    .then(Boolean);
  if (user) return null;

  return prisma.user.create({
    data: { nickname, password: await hash(password, 10) },
    select: { id: true },
  });
}

export async function validate(nickname: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { nickname },
    select: { id: true, password: true },
  });
  if (user && (await compare(password, user.password))) return { id: user.id };

  return null;
}
