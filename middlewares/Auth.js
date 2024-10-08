import jwt from "jsonwebtoken"
 
 const verifyToken = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).send("Access Denied")
    }
    try {
        const verified = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).send("Invalid Token")
    }
 }

 export default verifyToken