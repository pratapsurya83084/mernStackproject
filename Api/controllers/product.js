import {Products} from '../models/Product.js'

//add product
export const addProduct = async(req,res)=>{
    
// take input for image add 
try {
    const {title,description,price,category,qty,imgsrc,createdAt}=req.body
    
    //store into db
       const product = await Products.create({title,description,price,category,qty,imgsrc,createdAt})
     res.json({message:"product added successfully...",product})
        
} catch (error) {
    res.json({message:error.message})
}

}

//get all products
export const getAllProduct = async (req,res)=>{
    try {
        const getAllproduct = await Products.find().sort({createdAt:-1})
         res.json({message:"successfullly get all products",getAllproduct})
    } catch (error) {
        res.json({message :"...product is not found.....",error})
    }
 }
