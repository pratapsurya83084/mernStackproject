import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'
//sent token into header
export const Authenticated=async (req,res,next)=>{
 const token=req.header("Auth")
 if (!token) {
    return res.json({message:"login first"})
 } 

 //verify token
 const decode=jwt.verify(token ,  "!#&#%^()@&*")//(token,secretKey)
const UserId=decode.userId;

let user =await User.findById(UserId)
// console.log(user);
if (!user) return response.json({message:"user not found"})
//else save user
req.user=user;
next();


//  console.log(decode);
 
//  else{
//    res.json({message:true,login:"successfull login",tokens:token})
//  }
}