import express from 'express'
import {addProduct,getAllProduct}  from '../controllers/product.js'


const router=express.Router()

//addproduct 
router.post('/addproducts',addProduct)
//getall product
router.get("/getallproduct",getAllProduct)




export default router 