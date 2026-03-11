import jwt from 'jsonwebtoken'
import { User } from '../model/user.model.js';

export const isAuthenticated = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                success: false,
                message: "User not authenticated"
            })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findById(decode.id).select("-password")
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        req.user = user
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Invalid Token"
        })
    }
}


//authorization admin
export const isAdmin = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(400).json({
            success: false,
            message: "Admin access only"
        })
    }
    next();
}