import React, { useState, useEffect,useContext } from "react";
// import AppContext from '../context/AppContext';
// import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
const OrderUser = () => {
  const [allorder, setAllorder] = useState([]);
const url="https://mernstack1stproject-3.onrender.com/api"
// "https://mernstack1stproject-1.onrender.com/api"
  
  const getAllOrder = async () => {
    try {
      const api = await axios.get(
        `${url}/payment/allorder`,
        {
          headers: {
            "Content-Type": "application/json",
            // Auth: localStorage.getItem("token")?.replace(/^"|"$/g, ""), // Send the token correctly
          },
          withCredentials: true,
        }
      );

      setAllorder(api.data.orderDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  // console.log(allorder);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Order User List</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Sr. No</th>
              <th>Order id</th>
              <th>Title Product</th>
              <th>Product Price ($)</th>
              <th>Product Quantity</th>
              <th>Image Product</th>
              <th>User ID</th>
              <th>Username</th>
              <th>Address</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Pincode</th>
              <th>Phone Number</th>
              <th>Order_Date</th>
              
            </tr>
          </thead>
          <tbody>
            {allorder.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.order_id}</td>
                <td>{order.orderItems[0].title}</td>
                <td>₹.{order.amount}</td>
                <td>{order.orderItems[0].qty}</td>
                <td>
                  <img
                    src={order.orderItems[0].imgsrc}
                    alt={order.titleProduct}
                    className="img-fluid"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{order.userId}</td>
                <td>{order.userShippingaddress.fullname}</td>
                <td>{order.userShippingaddress.address}</td>
                <td>{order.userShippingaddress.country}</td>
                <td>{order.userShippingaddress.state}</td>
                <td>{order.userShippingaddress.city}</td>
                <td>{order.userShippingaddress.pincode}</td>
                <td>{order.userShippingaddress.phoneNumber}</td>
                <td>{order.orderDate}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderUser;
