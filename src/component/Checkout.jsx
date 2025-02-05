import React from "react";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
const Checkout = () => {
  const navigate = useNavigate();
  const { cartProduct, UserAddress, url ,clearCartAll} = useContext(AppContext);

  // Calculate the total price by summing the price of all products
  const totalPrice = cartProduct.reduce((sum, product) => {
    return sum + product.price * (product.quantity || 1); // Assuming each product has a 'price' and 'quantity'
  }, 0); // Initial sum is 0

  // console.log(cartProduct);
// console.log(UserAddress.userId);


//   const arr = [{}];
//   arr.push(UserAddress);
// console.log(arr.address);

  // console.log(url);
  const handlepay = async () => {
    try {
      const paymentresponse = await axios.post(`${url}/payment/checkout`, {
        amount: totalPrice,
        cartItems: cartProduct,
        usershipping: UserAddress,
        userid: UserAddress.id,
      });
      console.log("the order detail :", paymentresponse.data);
      const {orderId , amount:orderAmount }=paymentresponse.data;
      

//  console.log("userid : ",arr);
 
// console.log(orderAmount,orderId);


//payment gatway

var options = {
  "key": "rzp_test_5mOSYhsNR3SAHg", // Enter the Key ID generated from the Dashboard
  "amount": orderAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  "currency": "INR",
  "name": "CartNest",  //your appliction Name
  "description": "CartNest",
  "image": "https://files.oaiusercontent.com/file-H2yfq5Q1siiWFtKZzLBEoD?se=2024-12-22T10%3A55%3A29Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D59e4d9c7-3521-4595-b970-1e35362a588a.webp&sig=Ckdlgp0RebgEoOkHJPPgEFSFuwtwR7itidROC04fZzY%3D",
  "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
 
  "handler":async  function  (response) {
    // send data and store in db
   
  //  const paymentData = {
    const order_id= response.razorpay_order_id
  const   payment_id= response.razorpay_payment_id
   const payment_signature= response.razorpay_signature
   const amount= orderAmount // Ensure this is defined
    const orderItems=cartProduct // Ensure this is defined
    const userId=UserAddress.userId   //user id whoes payment 
 const   userShippingaddress =UserAddress
// };

// console.log("Payment Data to Send:", paymentData);
const api= await axios.post(`${url}/payment/verify-payment`,{order_id,payment_id,payment_signature,amount,orderItems,userId,userShippingaddress},{
  headers: {
    "Content-Type": "application/json",
  },
 
})
 console.log(api.data);
 
if (api.data.success) {
  navigate('/orderconfirmation')
  clearCartAll();
 
}
  },

  "prefill": {
      // "name": "CartNest",
      "email": "cartnest008@gmail.com",
      "contact": "9000090000"
  },
  "notes": {
      "address": " CartNest  Corporate Office , Pune"
  },
  "theme": {
      "color": "#3399cc"
  }
};


const razorepay = new window.Razorpay(options);
razorepay.open();
      
    } catch (error) {
      console.log("failed order ", error);
    }
  };



// console.log(cartProduct);


  return (
    <div className="container mt-4 text-dark">
      <div className="row">
        {/* Left Section: Product Details */}
        <div className="col-md-8">
          <h3 className="mb-4">Your Prodcuts</h3>
          {cartProduct.length > 0 ? (
            <div className="list-group">
              {cartProduct.map((data, i) => (
                <div
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-3 rounded"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={data.imgsrc}
                      alt="Product"
                      className="rounded"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginRight: "15px",
                      }}
                    />
                    <div>
                      <h5 className="text-primary mb-1">{data.title}</h5>
                     
                      <p className="mb-0">
                        <strong>Qty:</strong> {data.qty}
                      </p>
                    </div>
                  </div>
                  <div className="text-end">
                  <p className="mb-1">
                        <strong>Price:</strong> ₹{data.price}
                      </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">Your cart is empty.</p>
          )}
        </div>

        {/* Right Section: Order Summary */}
        {/* {arr.map((addres, i) => { */}
          {/* return ( */}
            <div  className="col-md-4">
              <div className="sticky-top" style={{ top: "20px" }}>
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <h5 className="card-title text-secondary">
                      Shipping Address
                    </h5>
                    <hr />
                    <p className="card-text mb-2">
                      <strong>Name :</strong> {UserAddress.fullname}
                    </p>
                    <p className="card-text mb-2">
                      <strong>Address :</strong>
                      {UserAddress.address}
                    </p>
                    <p className="card-text mb-2">
                      <strong>City :</strong> {UserAddress.city}
                    </p>
                    <p className="card-text mb-2">
                      <strong>State :</strong> {UserAddress.state}
                    </p>
                    <p className="card-text mb-2">
                      <strong>ZIP Code :</strong> {UserAddress.pincode}
                    </p>
                    <p className="card-text mb-3">
                      <strong>Phone :</strong> {UserAddress.phoneNumber}
                    </p>
                    <button
                      className="btn btn-primary w-100"
                      onClick={handlepay}
                    >
                      {" "}
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          {/* );
        })} */}
      </div>
    </div>
  );
};

export default Checkout;
