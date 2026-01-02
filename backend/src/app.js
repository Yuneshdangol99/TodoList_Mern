import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.middleware.js"


const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
// app.options('*', cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes 

import userRoutes from "./routes/user.routes.js";

app.use("/api/v1/users", userRoutes);

// middlewares
app.use(errorHandler);


export { app }