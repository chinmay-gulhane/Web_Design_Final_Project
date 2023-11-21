import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv"
import { connectDB } from "./database/connectDb.js";
import userRouter from "./routes/userRoute.js"; 
import deliveryRoutes from "./routes/deliveryRoutes.js";


// Used to access variables from .env
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Handles the responses in json format
app.use(express.json());

// for cross origin issues i.e client and server running on different ports
app.use(cors());

app.use(express.urlencoded());

// to log requested api in console
app.use(morgan("dev"));

// allows app to use auth routes
app.use("/auth", userRouter);
app.use("/delivery", deliveryRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running successfully on ${PORT}`.bgGreen.white);
});


