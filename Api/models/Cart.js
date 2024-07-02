import mongoose from 'mongoose'

const cartitemSchema = new mongoose.Schema({
    productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
},

title:{type:String,require:true}

},{timestamps:true})



const cartSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
},
items:[]

},{timestamps:true})