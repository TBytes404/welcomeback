import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// prisma.$extends({
//   query: {
//     user: {
//       async create({ args, query }) {
//         return query({ ...args, password: await hash(args.data.password) });
//       },
//       async update({ args, query }) {
//         if (typeof args.data.password === "object" && args.data.password.set)
//           return query({
//             ...args,
//             password: await hash(args.data.password.set),
//           });
//         else if (typeof args.data.password === "string")
//           return query({ ...args, password: await hash(args.data.password) });
//         else return query(args);
//       },
//     },
//   },
//   result: {
//     user: {
//       password: {
//         needs: {},
//         compute: () => undefined,
//       },
//     },
//   },
// });
