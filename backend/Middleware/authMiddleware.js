import jwt from "jsonwebtoken";


export function authMiddleware(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(
          token,
          process.env.secretkey
        );

        req.user = decoded;

        next();

    } catch(err){
        return res.status(401).json({
          message:"Unauthorized"
        });
    }
}