import { prisma } from "@/lib/prisma";

export default async function Users() {
  const users = await prisma.user.findMany({ select: { nickname: true } });
  return (
    <ul>
      {users.map((user) => {
        return <li key={user.nickname}>{user.nickname}</li>;
      })}
    </ul>
  );
}
