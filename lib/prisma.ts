/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
} as any;

// Only create Prisma client on server-side
const prisma =
  typeof window === "undefined"
    ? globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate())
    : null;

if (typeof window === "undefined" && process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
