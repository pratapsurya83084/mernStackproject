//sent token into header
export const Authenticated=async (req,res,next)=>{
 const token=req.header("Auth")
 if (!token) {
    return res.json({message:"login first"})
 } 
 
}