import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  ["abcdefG0"].forEach(async (nickname) => {
    const data = { nickname, password: nickname };
    const user = await prisma.user.upsert({
      create: data,
      update: data,
      where: { nickname },
    });
    console.log(`Created user with id: ${user.id}`);
  });
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
