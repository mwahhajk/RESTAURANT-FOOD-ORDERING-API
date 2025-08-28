import User from "../models/userSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser=async (req,res,next)=>{
    try{
    console.log("register user");
    const{username,email,password,address,phone,usertype,profile,answer}=req.body;
    if(!username||!email||!password||!address||!phone||!answer){
        return res.json("Please provide all required fields")
    }

    const findUser=await User.findOne({email})
    if(findUser)
    {
        return res.status(500).json({
            success:false,
            message:"User Already Exist With this email"
        })
    }
    console.log(password);
    
    const hashedPassword=await bcrypt.hash(password,10);
    console.log(hashedPassword);
    
    const createdUser=await User.create({
        username,email,password:hashedPassword,address,phone,answer
    })
    return res.status(201).json({
        success:true,
        message:"User Created...",
        User:createdUser
    })
}
catch(err){
    return res.status(400).json({err})
}

}

// loging functionality

export const loginUser=async(req,res)=>{
    try{
    console.log("User Controller");
    const{email,password}=req.body;
    const findUser=await User.findOne({email});
    if(!findUser)
    {
        return res.status(500).json({
            success:false,
            message:"User Does Not Exist"
        })
    }
    const comarePassword=await bcrypt.compare(password,findUser.password)
    if(!comarePassword)
    {
        return res.status(500).json({
            success:false,
            message:"Wrong Credentials"
        })
    }
    const token=jwt.sign({ id: findUser._id }, "pkfkdfddf", { expiresIn: "7d" })
    findUser.password=undefined;
    return res.status(200).json({
        success:true,
        message:"User Logged In Successully",
        findUser,
        token
    })}
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in Login API",
            err
        })
        
    }
    
}