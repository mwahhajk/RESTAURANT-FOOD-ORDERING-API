import jwt from "jsonwebtoken";

export const authMiddleware=async(req,res,next)=>{
    const token=req.headers["authorization"].split(" ")[1];
    jwt.verify(token,"pkfkdfddf",(err,decode)=>{
        if(err)
        {
            return res.status(400).json({
                success:false,
                message:"Un-Authorized User"
            })
        }
        else{
            req.body.id=decode.id;
            next()
        }
    })
}