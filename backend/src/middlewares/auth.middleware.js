import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"


export const verifyJWT = asyncHandler(async (req, res, next) => {
    try{
        const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        // console.log(token)
        if(!token){
            throw new ApiError(401, "Unauthorized Request")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // console.log("-----------")
        // console.log(decodedToken?._id)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        // console.log(user)
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user = {userId : user._id, role: user.role}
        // console.log(user))
        next()
    }catch(err){
        throw new ApiError(401, err?.message || "Invalid access token")
    }
})