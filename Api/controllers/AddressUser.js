import {Address} from "../models/Address.js";

export const AddressUser =async (req,res)=> {

let {fullname,address,city,state,country,pincode,phoneNumber} = req.body;

console.log(fullname,address,city,state,country,pincode,phoneNumber);

const save=Address.create({fullname,address,city,state,country,pincode,phoneNumber})
if (!save) {

    return res.json({
        message:"failed somtrhing went wrong..........",
   sucess:true,
    });

}else{
    res.json({
        message:"Address added successfully",
        address:address,
        sucess:true,
    });
 
}
}