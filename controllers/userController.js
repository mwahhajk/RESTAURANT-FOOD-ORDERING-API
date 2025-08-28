import User from "../models/userSchema.js";

export const getUserController=async(req,res)=>{
    console.log("Get User Controller");
    const findUser=await User.findById(req.user.id);
    // console.log(findUser);
    if(findUser)
    {
        return res.status(200).json({
            success:true,
            user:findUser
        })
    }
    else{
        return res.status(400).json({
            success:false,
            message:"User Not Found"
        })
    }
    
    
}

export const updateUserController=async(req,res)=>{
    console.log("Update User Controller")
    try {
        const user=await User.findById(req.user.id);
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"User Not Found"
            })
        }
        else{
            const updatedUser=await User.findByIdAndUpdate(req.user.id,req.body,{
                new: true,
                // runValidators: true,
                // useFindAndModify: false,
            })
            return res.status(200).json({
                success:true,
                message:"User Updated Successfully",
                Updated_User:updatedUser
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error in Update User API",
            err:error
        })
        
    }
}

export const updatePasswordController=async(req,res)=>{
    console.log("Update Pass Controller");
}

export const changePasswordController=async(req,res)=>{
    console.log("Change Pass Controller");
}

export const deleteProfileController=async(req,res)=>{
    console.log("Delete Profile Controller");
}