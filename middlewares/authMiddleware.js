import jwt from "jsonwebtoken";

export const authMiddleware=async(req,res,next)=>{
    const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing",
    });
  }

  const token = authHeader.split(" ")[1]; 

    if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token missing",
    });
  }
    jwt.verify(token,"pkfkdfddf",(err,decode)=>{
        if(err)
        {
            return res.status(400).json({
                success:false,
                message:"Un-Authorized User"
            })
        }
        else{
            console.log("decode");
            console.log(decode.id);
            
            
            // req.body.id=decode.id;
            req.user = { id: decode.id };
            next()
        }
    })
}