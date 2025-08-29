import express from "express";
import {config} from 'dotenv'
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"
import restaurantRoute from "./routes/restaurantRoute.js"
import cors from "cors"
import { connectDB } from "./db/dbConnection.js";

const app=express();

config({path:"./config/config.env"})

//Middlewares

app.use(express.json());
app.use(cors());

// auth route
app.use("/api/v1/auth",authRoute)

// User Route
app.use("/api/v1/user",userRoute)

// Restaurant Routes
app.use("/api/v1/restaurant",restaurantRoute)


connectDB();

export default app;