require("dotenv").config({ path: "./config.env" });
const express = require("express");

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));