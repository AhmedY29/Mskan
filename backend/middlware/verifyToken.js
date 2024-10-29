import jwt  from "jsonwebtoken";

export const verifyToken = (req, res, next) =>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({success: false, message:"Unathorized token"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return res.status(401).json({success: false, message:"TUnathorized token"});
        req.userId = decoded.userId
        next();
    } catch (error) {
        console.log('Error in verifyToken' , error);
        res.status(500).json({success: false, message:"Server error"});
    }
}