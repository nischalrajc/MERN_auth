import express from "express";
import dotenv from "dotenv";
import userRoutes from './routes/userRouters.js'
import { notfound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";


dotenv.config()

const port = process.env.PORT || 5000

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use('/api/users',userRoutes);

app.get('/',(req,res)=> res.send('server is ready'))

app.use(notfound);
app.use(errorHandler);

app.listen(port,()=>console.log(`server listening to localhost:${port} `))      