import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
       const connection = await mongoose.connect(process.env.MONGODB_URI)
       if(connection){
        console.log('db Connected Successfully');
        
       }
    } catch (error) {
        console.log('Failed to connect with Database',error);
        
    }
}