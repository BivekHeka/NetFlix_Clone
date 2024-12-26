import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars.js"
import { User } from "../models/user.model.js"
 

export const generateTokenAndSetCookies =(UserId,res)=>{
    const token=jwt.sign({UserId},ENV_VARS.JWT_SECRET, {expiresIn:'15d'})

    res.cookie("jwt-netflix",token,{
        maxAge:25*24*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:ENV_VARS.NODE_ENV !=="development"
    });

    return token;
}