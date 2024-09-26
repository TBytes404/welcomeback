import { PrismaClient, Prisma } from "@prisma/client";
import { saltHashPassword } from "@/utils";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  // @ts-expect-error Top-level 'await'
  { name: "Alice", passhash: await saltHashPassword("Alice") },
  // @ts-expect-error Top-level 'await'
  { name: "Nilu", passhash: await saltHashPassword("Nilu") },
  // @ts-expect-error Top-level 'await'
  { name: "Mahmoud", passhash: await saltHashPassword("Mahmoud") },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const data of userData) {
    const user = await prisma.user.upsert({
      create: data,
      update: data,
      where: { name: data.name },
    });
    console.log(`Created user with id: ${user.id}`);
  }
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
