import express from 'express'
import {register,Userlogin,allUsers}  from '../controllers/user.js'

const router=express.Router()

//register user
router.post('/register',register)
// login router
router.post('/login',Userlogin)
//create a routes for allUsers 
router.get("/allusers",allUsers)

export default router  //this router export into server.js file











// import express from 'express';
// import { register } from '../controllers/user.js';

// const router = express.Router();

// // Register route
// router.post('/register', register);

// export default router;
