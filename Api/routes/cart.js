import {addTocart,UserCart,removeproductFromCart,clearCart} from '../controllers/cart.js'
import express from 'express'


const router=express.Router()
//add cart router
router.post("/add",addTocart)


//get user cart product
router.get("/userCart",UserCart)

//remove from cart Router
router.delete("/removeCart/:productId",removeproductFromCart)

//remove all items from cart
router.delete("/clear",clearCart)
export default router 