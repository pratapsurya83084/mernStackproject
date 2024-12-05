import express from 'express'
import {Authenticated} from '../middlewares/Auth.js'
import {AddressUser} from '../controllers/AddressUser.js'
const router=express.Router()
//add cart router
router.post("/addaddress",Authenticated,AddressUser)

export  default router;