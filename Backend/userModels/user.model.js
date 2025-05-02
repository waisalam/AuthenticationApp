import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname:{
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String
    }
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  emailVerified: { type: Boolean, default: false },          // new
  verificationCode: { type: String },                       // new
  verificationExpires: { type: Date } 
})

export const User = mongoose.model('User',userSchema)