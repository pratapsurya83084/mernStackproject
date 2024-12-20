import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
//sent token into header
export const Authenticated = async (req, res, next) => {
  const token = req.header("Auth");

  console.log("Token received  : ", token);

  if (!token) {
    return res.json({ message: "please login first" });
  }

  try {
   //verify token
   const decode = jwt.verify(token,'#$#$#(*$'); //(token,secretKey)
   console.log("decoded token is....: ",decode);
   
   const UserId = decode.userId;
 
   let user = await User.findById(UserId);
   // console.log(user);
   if (!user) {
     return response.json({ message: "user not found" });
   } else {
     req.user =user;
     next();
     res.json({ message: true, login: "successfull login", tokens: token ,email :req.user.email,name:req.user.name });
 
  
   
    }
  } catch (error) {
   console.error("Token verification failed:", error);
   return res.status(401).json({ message: "Invalid or expired token" });
   
  }
};



//cart Auth
export const AuthCart = async(req,res,next)=>{
  const token = req.header("Auth");

  console.log("Token received  : ", token);

  if (!token) {
    return res.json({ message: "please login first" });
  }

  try {
   //verify token
   const decode = jwt.verify(token,'#$#$#(*$'); //(token,secretKey)
   console.log("decoded token is....: ",decode);
   
   const UserId = decode.userId;
 
   let user = await User.findById(UserId);
   // console.log(user);
   if (!user) {
     return response.json({ message: "user not found" });
   } else {

     req.user = user
     next();
    //  res.json({ message: true, login: "successfull add product",});
  
    
 
}
  } catch (error) {
   console.error("Token verification failed:", error);
   return res.status(401).json({ message: "Invalid or expired token" });
   
  }
}

// AuthAddCart
export const AuthAddCart = async(req,res,next)=>{
  const token = req.header("Auth");

  console.log("Token received  : ", token);

  if (!token) {
    return res.json({ message: "please login first" });
  }

  try {
   //verify token
   const decode = jwt.verify(token,'#$#$#(*$'); //(token,secretKey)
   console.log("decoded token is....: ",decode);
   
   const UserId = decode.userId;
 
   let user = await User.findById(UserId);
   // console.log(user);
   if (!user) {
     return response.json({ message: "user not found" });
   } else {

     req.user = user
     next();
    //  res.json({ message: true, login: "successfull add product",});
  
    
 
}
  } catch (error) {
   console.error("Token verification failed:", error);
   return res.status(401).json({ message: "Invalid or expired token" });
   
  }
}


export const RemovefromCart = async(req,res,next)=>{
  const token = req.header("Auth");

  console.log("Token received  : ", token);

  if (!token) {
    return res.json({ message: "please login first" });
  }

  try {
   //verify token
   const decode = jwt.verify(token,'#$#$#(*$'); //(token,secretKey)
   console.log("decoded token is....: ",decode);
   
   const UserId = decode.userId;
 
   let user = await User.findById(UserId);
   // console.log(user);
   if (!user) {
     return response.json({ message: "user not found" });
   } else {

     req.user = user
     next();
    //  res.json({ message: true, login: "successfull add product",});
  
    
 
}
  } catch (error) {
   console.error("Token verification failed:", error);
   return res.status(401).json({ message: "Invalid or expired token" });
   
  }
}


export const decsreaseQty = async(req,res,next)=>{
  const token = req.header("Auth");

  console.log("Token received  : ", token);

  if (!token) {
    return res.json({ message: "please login first" });
  }

  try {
   //verify token
   const decode = jwt.verify(token,'#$#$#(*$'); //(token,secretKey)
   console.log("decoded token is....: ",decode);
   
   const UserId = decode.userId;
 
   let user = await User.findById(UserId);
   // console.log(user);
   if (!user) {
     return response.json({ message: "user not found" });
   } else {

     req.user = user
     next();
    //  res.json({ message: true, login: "successfull add product",});
  
    
 
}
  } catch (error) {
   console.error("Token verification failed:", error);
   return res.status(401).json({ message: "Invalid or expired token" });
   
  }
}



// incsreaseQty auth
export const incsreaseQty = async(req,res,next)=>{
  const token = req.header("Auth");

  console.log("Token received  : ", token);

  if (!token) {
    return res.json({ message: "please login first" });
  }

  try {
   //verify token
   const decode = jwt.verify(token,'#$#$#(*$'); //(token,secretKey)
   console.log("decoded token is....: ",decode);
   
   const UserId = decode.userId;
 
   let user = await User.findById(UserId);
   // console.log(user);
   if (!user) {
     return response.json({ message: "user not found" });
   } else {

     req.user = user
     next();
    //  res.json({ message: true, login: "successfull add product",});
  
    
 
}
  } catch (error) {
   console.error("Token verification failed:", error);
   return res.status(401).json({ message: "Invalid or expired token" });
   
  }
}


export const addressmiddlewaere = async(req,res,next)=>{
  const token = req.header("Auth");

  console.log("Token received  : ", token);

  if (!token) {
    return res.json({ message: "please login first" });
  }

  try {
   //verify token
   const decode = jwt.verify(token,'#$#$#(*$'); //(token,secretKey)
   console.log("decoded token is....: ",decode);
   
   const UserId = decode.userId;
 
   let user = await User.findById(UserId);
   // console.log(user);
   if (!user) {
     return response.json({ message: "user not found" });
   } else {

     req.user = user
     next();
    //  res.json({ message: true, login: "successfull add product",});
  
    
 
}
  } catch (error) {
   console.error("Token verification failed:", error);
   return res.status(401).json({ message: "Invalid or expired token" });
   
  }
}
