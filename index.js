const express = require("express");
const PORT = 3000;
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth",authRoutes);

app.use("/api-docs",swaggerUI.serve , swaggerUI.setup(swaggerSpec));

app.get("/",(req,res) => {
    res.send("DAY 4");
})

app.listen(PORT, (req,res) => {
    console.log(`Server is running on port ${PORT}`);
})

