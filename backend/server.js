import express from "express";
import dotenv from "dotenv";
import userRoutes from './routes/userRouters.js';
import adminRoutes from './routes/adminRoutes.js';
import { notfound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url'; // Import the fileURLToPath function
import path from "path";



dotenv.config()

const port = process.env.PORT || 5000

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url); // Get the current module's filename
const __dirname = path.dirname(__filename); // Get the directory name

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use('/api/admin',adminRoutes)
app.use('/api/users',userRoutes);

app.use('/image', express.static(path.join(__dirname, './utils/uploads')));

app.get('/',(req,res)=> res.send('server is ready'))

app.use(notfound);
app.use(errorHandler);

app.listen(port,()=>console.log(`server listening to localhost:${port} `))      