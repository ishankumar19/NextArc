import { PrismaClient } from "@/generated/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * Parses and ensures connection pool parameters for PostgreSQL.
 * Sized according to the horizontal scaling connection budget:
 * Total = (App Instances * 10) + (Workers * 5) + 10 Reserves <= Target DB Limit.
 */
function getDatasourceUrl(): string | undefined {
  const url = process.env.DATABASE_URL;
  if (!url || !url.startsWith("postgres")) return url;

  // If URL already specifies connection_limit, leave it intact
  if (url.includes("connection_limit=")) return url;

  const poolSize = process.env.DB_POOL_SIZE || "10";
  const poolTimeout = process.env.DB_POOL_TIMEOUT || "10";
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}connection_limit=${poolSize}&pool_timeout=${poolTimeout}`;
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: getDatasourceUrl(),
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Calculates current horizontal scaling connection budget for operators.
 */
export function getDatabaseConnectionBudget(appInstances = 4, workerInstances = 2) {
  const connectionsPerApp = parseInt(process.env.DB_POOL_SIZE || "10", 10);
  const connectionsPerWorker = 5;
  const adminReserve = 5;
  const monitoringReserve = 5;

  const totalBudget =
    appInstances * connectionsPerApp +
    workerInstances * connectionsPerWorker +
    adminReserve +
    monitoringReserve;

  return {
    appInstances,
    connectionsPerApp,
    workerInstances,
    connectionsPerWorker,
    adminReserve,
    monitoringReserve,
    totalBudget,
    safeFor100ConnDb: totalBudget <= 100,
  };
}

export default prisma;
