import express from 'express'
import mongoose from 'mongoose'

import bodyParser from  "express"
import userRouter from './routes/user.js'
import ProductRouter  from './routes/product.js'
import cartRouter from './routes/cart.js'


const app=express();

app.use(bodyParser.json())
//home testing route
app.get("/",(req,res)=>{
    res.json({message:"this  is home route"})
})

//user Router
app.use("/api/user",userRouter)

// addproduct Router
app.use("/api/product",ProductRouter) 

//addToCart router
app.use("/api/cart",cartRouter)


mongoose.connect("mongodb+srv://pratapsuryawanshi007:onzkR6JQOQ0aXlF1@cluster0.5parnxe.mongodb.net/",{
    dbName:"mern_ecomerce"
}).then(()=>console.log("...............mongoodb connected successfully................."))

const port =1000;
app.listen(port,()=>{
    console.log(`server runnning on port ${port}`);
})

