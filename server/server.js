import express from "express";
import dotenv from "dotenv"
import AuthRoutes from "./routes/auth.js";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.js";

dotenv.config({ path: "./config.env" });

// Connect DB
connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", AuthRoutes);

// Error Handler (should be last piece of middleware)
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})