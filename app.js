import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

// Config .env
dotenv.config();

import indexRoutes from "./routes/index.routes.js";
import authRoutes from "./routes/auth.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import productsRoutes from "./routes/products.routes.js";

const app = express();
const port = process.env.APP_PORT || 5000;

// Default app config
app.use(express.json());
app.use(helmet());
app.use(cors());
morgan("tiny");

// Routes uses
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);

// Ru express app
app.listen(port, function () {
    console.log("App is running on http://localhost:" + port);
});
