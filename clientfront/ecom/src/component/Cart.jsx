import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";

const Cart = () => {
  const { cartProduct } = useContext(AppContext);

  console.log(cartProduct);

  return (
  
    <div>
      {
        cartProduct? 
        <div className="container my-5">
        {/* Page Header */}
        <h2 className="mb-4 text-dark">Shopping Cart</h2>
  
        {/* Cart Table */}
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="bg-warning text-white">
              <tr>
             
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Row */}
              {cartProduct.map((item, i) => (
                <tr key={i}>
                 
                  <td>
                    <img src={item.imgsrc} alt="Product" 
                    style={{height:"70px", width:"60px"}}
                    className="img-fluid w-16 h-16" />
                  </td>
                  <td>{item.title}</td>
                  <td>₹.{item.price}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      defaultValue="1"
                    />
                  </td>
                  {/* remove from cart */}
                  <td>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                      cursor="pointer"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </div>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Coupon and Total Section */}
        <div className="row mt-4">
          {/* Coupon Section */}
          <div className="col-md-6 mb-4">
            <div className="p-3 border">
              <h5 className="mb-3">Coupon</h5>
              <p>Enter your coupon code if you have one.</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Coupon Code"
                />
                <button className="btn btn-dark">Apply Coupon</button>
              </div>
            </div>
          </div>
  
          {/* Cart Total Section */}
          <div className="col-md-6">
            <div className="p-3 border">
              <h5 className="mb-3">Cart Total</h5>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Subtotal</span>
                  <strong>$215.00</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Shipping</span>
                  <strong>$255.00</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total</span>
                  <strong>$470.00</strong>
                </li>
              </ul>
              <button className="btn btn-success w-100 mt-3">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div> 
      :

      (
        <div>
          product not found
        </div>
      )
      }
    </div>
    
 
  );
};

export default Cart;
