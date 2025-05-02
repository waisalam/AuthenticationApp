import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { dbConnect } from './connectToDB.js';
import userRoutes from './userRoutes/userRoutes.js'

 const app= express()
 app.use(cors())
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

