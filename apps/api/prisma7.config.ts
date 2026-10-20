import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import { defineConfig, env } from "prisma/config";

// Load environment variables from the monorepo root
config({
    path: fileURLToPath(new URL("../../.env", import.meta.url)),
});

export default defineConfig({
    schema: "prisma/schema.prisma",

    migrations: {
        path: "prisma/migrations",
    },

    datasource: {
        url: env("DATABASE_URL"),
    },
});
