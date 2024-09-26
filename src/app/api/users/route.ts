import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany({ omit: { passhash: false } });
  // const user = await prisma.user.update({
  //   where: { id: users[0].id },
  //   select: { passhash: true },
  //   data: { passhash: users[0].name },
  // });
  return NextResponse.json({ users }, { status: 200 });
}
