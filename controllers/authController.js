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