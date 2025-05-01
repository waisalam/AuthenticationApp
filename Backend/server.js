import { app } from "./app.js";

const port = process.env.PORT || 4000;

app.get('/', (req , res)=>{
res.send('Hello World')
})

app.listen(port , ()=>{
    console.log(`server is running on http://localhost:${port}`);
    
})