import {addToCart,UserCart,removeproductFromCart,clearCart,decreaseProductqty} from '../controllers/cart.js'
import express from 'express'

import { Authenticated,AuthCart } from '../middlewares/Auth.js'

const router=express.Router()
//add cart router
router.post("/add",AuthCart,addToCart) //Authenticated


//get user cart product
router.get("/userCart",Authenticated,UserCart)

//remove from cart Router
router.delete("/removeCart/:productId",Authenticated,removeproductFromCart)

//remove all items from cart
router.delete("/clear",Authenticated,clearCart)

//decrese item qty
router.post("/--qty",Authenticated,decreaseProductqty)
export default router 