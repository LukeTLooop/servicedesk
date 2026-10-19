import express from "express";
import cors from "cors";

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

// Start listening for requests
app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
});
