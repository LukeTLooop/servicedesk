import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

// Load environment variables from the monorepo root
config({
    path: fileURLToPath(new URL("../../../.env", import.meta.url)),
});

// Retrieve the PostgreSQL connection string
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is missing");
}

// Create the PostgreSQL driver adapter
const adapter = new PrismaPg({
    connectionString,
});

// Create and export a reusable Prisma Client
export const prisma = new PrismaClient({
    adapter,
});
