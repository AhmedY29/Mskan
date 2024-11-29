import express from "express";
import { connectDB } from "./config/db.js";
import routerProperties from "./routes/property.route.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.route.js';
import saveRoutes from './routes/saveProperty.route.js';
import path from 'path'
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()

app.use(express.json({limit:"10mb"}));
app.use(cookieParser()); 
if (process.env.NODE_ENV !== 'production'){
    app.use(cors({origin:"http://localhost:5173", credentials:true}));
}
  // Enable cors for all requests

app.use('/api', routerProperties)


// Authentication 
app.use('/api/auth', authRoutes)
app.use('/api/save', saveRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}


app.listen(PORT, ()=>{
    connectDB();
    console.log("Server is running on port:" , PORT);
});
