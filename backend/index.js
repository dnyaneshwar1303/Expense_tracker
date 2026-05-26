import express from "express";
import dotenv from "dotenv";
import userRouter from "./Routes/userRoutes.js";
import expenseRouter from "./Routes/expenseRoutes.js";
import cors from "cors";

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());

app.use("/",userRouter);
app.use("/",expenseRouter);

app.listen(process.env.port,()=>{
    console.log(`server is running on port ${process.env.port}`);
})