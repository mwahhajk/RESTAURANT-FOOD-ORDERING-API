import express from "express";
import {config} from 'dotenv'
import authRoute from "./routes/authRoute.js"
import cors from "cors"

const app=express();

config({path:"./config/config.env"})

//Middlewares

app.use(express.json());
app.use(cors());

// user route
app.use("/api/v1/auth",authRoute)

export default app;