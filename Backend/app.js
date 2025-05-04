import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { dbConnect } from './connectToDB.js';
import userRoutes from './userRoutes/userRoutes.js'

 const app= express()
 const corsOptions = {
    origin: 'http://localhost:5173',  // Only allow the frontend URL
    credentials: true,  // Allow cookies (such as JWT token) to be sent along with requests
  };
 app.use(cors(corsOptions))
 app.use(cookieParser())
 app.use(express.json())
 dbConnect()


const port = process.env.PORT || 4000;

app.get('/', (req , res)=>{
res.send('Hello World')
})
app.use('/user', userRoutes)

app.listen(port , ()=>{
    console.log(`server is running on http://localhost:${port}`);
    
})

