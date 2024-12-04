import {addTocart,UserCart,removeproductFromCart,clearCart,decreaseProductqty} from '../controllers/cart.js'
import express from 'express'

import { Authenticated } from '../middlewares/auth.js'

const router=express.Router()
//add cart router
router.post("/add",Authenticated,addTocart)


//get user cart product
router.get("/userCart",UserCart)

//remove from cart Router
router.delete("/removeCart/:productId",removeproductFromCart)

//remove all items from cart
router.delete("/clear",clearCart)

//decrese item qty
router.post("/--qty",decreaseProductqty)
export default router 