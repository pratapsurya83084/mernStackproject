import {addTocart} from '../controllers/cart.js'
import express from 'express'


const router=express.Router()
//add cart router
router.post("/add",addTocart)

export default router 