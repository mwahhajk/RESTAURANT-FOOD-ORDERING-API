import User from "../models/userSchema.js";
import bcrypt from "bcrypt"

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
    const{password, newPassword}=req.body;
    try {
        const user=await User.findById(req.user.id);
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"User Not Found"
            })
        }    
        const comparePass=await bcrypt.compare(password,user.password);
        if(!comparePass)
        {
            return res.status(500).send({
            success: false,
            message: "Invalid old password",
      });
        }
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(newPassword,salt)
        console.log(hashPassword);
        user.password=hashPassword
        await user.save();
        res.status(200).send({
      success: true,
      message: "Password Updated!",
    });

    } catch (error) {
      console.log(error);
      res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    }); 
    }
}

export const resetPasswordController = async (req, res) => {
  try {
    console.log("Rset Password");
    
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Privide All Fields",
      });
    }
    const user = await User.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found or invlaid answer",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "eror in PASSWORD RESET API",
      error,
    });
  }
};


export const deleteProfileController=async(req,res)=>{
    console.log("Delete Profile Controller");
    try {
         const user=await User.findById(req.user.id);
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"User Not Found"
            })
        }
        const deleteProfile=await User.findByIdAndDelete(req.user.id);
        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully"
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error in Update User API",
            err:error
    })
}
}