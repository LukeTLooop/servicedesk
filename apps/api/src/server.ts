import express from "express";
import cors from "cors";
import { prisma } from "./db.js";

// Create Express application
const app = express();

// Configure server port
const PORT = Number(process.env.PORT ?? 4000);

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
}));

app.use(express.json());

// Health check endpoint
app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        message: "ServiceDesk API is running",
    });
});

// Database health check endpoint
app.get("/health/db", async (_req, res) => {
    try {
        // Execute a SQL query through prisma
        const result = await prisma.$queryRaw<Array<{ database: string }>>`
            SELECT current_database() AS database
        `;

        res.status(200).json({
            status: "ok",
            database: result[0]?.database,
            message: "PostgreSQL connection successful",
        });
    } catch (error) {
        console.error("Database connection failed:", error);

        res.status(503).json({
            status: "error",
            message: "PostgreSQL connection failed",
        });
    }
});

// Start listening for requests
app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
});
