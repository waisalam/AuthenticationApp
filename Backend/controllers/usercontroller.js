import { User } from "../userModels/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { transporter } from "../utils/mail.js";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: 400,
      message: "error in register validation",
      errors: errors.array(),
    });
  }
  const { fullname, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    res.json({
      status: 400,
      message: "user is already registered",
    });
    return console.log("user is already registerd");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  const newUser = await User.create({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    verificationCode,
    verificationExpires: Date.now() + 10 * 60 * 1000,
    password: hashPassword,
    emailVerified: false,
  });

const sendCode = await transporter.sendMail({
  from:process.env.EMAIL_USER,
  to:newUser.email,
   subject: 'Verify your email',
   html: `<p>Your verification code is <b>${verificationCode}</b>. It will expire in 10 minutes.</p>`
}) 
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

  res.cookie("token", token);
  res.json({
    status: 201,
    message: "User Registered Successfully",
    token,
    newUser,
  });
};

export const verifyUserEmail = async (req, res)=>{
  const {email, verificationCode} =req.body;
  const user= await User.findOne({email, verificationCode})
if(!user){
  return res.status(401).json({message: 'user with this email not found please register first'})
}
user.emailVerified= true
user.verificationCode='verified'
user.verificationExpires=undefined
await user.save()

res.status(200).json({message:'user email verified successfully', user})

}

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "error while validating the user login",
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ status: 400, message: "user not found please register" });
  }
  if (!user.emailVerified) {
    return res.status(400).json({ message: "Email is not verified" });
  }
  const ismatch = await bcrypt.compare(password, user.password);
  if (!ismatch) {
    return res.json({ status: 400, message: "user password is wrong" });
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);
  res.status(201).json({
    message: "user loggedIn successfully",
    token,
    user,
  });
  
};

export const logoutUser = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization;
  if (!token) {
    return res.status(400).json({ message: "user token not found" });
  }

  res.clearCookie("token", token);
  res.status(200).json({ message: "user LoggedOut successfully" });
};

export const requestPasswordChange = async (req,res)=>{
  const {email} =req.body

  const user= await User.findOne({email})
  if(!user || !user.emailVerified){
    return res.status(401).json({message:'email is not found'})
  }
  const generateCode = Math.floor(100000+Math.random()*900000)
  user.verificationCode=generateCode;
  user.verificationExpires=Date.now() + 10 * 60 * 1000;
  await user.save()
  const sendcode = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to:user.email,
    subject:'verify email for changing of your password',
    html: `<p>Your verification code is <b>${generateCode}</b>. It will expire in 10 minutes.</p>`
  })

res.status(200).json({message:'verification code sent successfully'})
}

export const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "user not found please enter correct email" });
  }

  const comparePassword = await bcrypt.compare(oldPassword
    , user.password);
  if (!comparePassword) {
    return res.status(400).json({ message: "please enter correct password" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ message: "password changed successfully", user });
};
