import { Env } from "@/config";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      Env.isDev
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (!Env.isProd) {
  globalForPrisma.prisma = prisma;
}