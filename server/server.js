import express from "express";
import dotenv from "dotenv"
import AuthRoutes from "./routes/auth.js";


const app = express();
dotenv.config({ path: "./config.env" });

app.use(express.json());

app.use("/api/auth", AuthRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));