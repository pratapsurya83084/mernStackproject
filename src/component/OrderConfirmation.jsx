import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState([userOrder]);

  // Ensure latest order is set from userOrder data
  useEffect(() => {
    if (userOrder && userOrder.orderDetails) {
      const latest = userOrder.orderDetails[userOrder.orderDetails.length - 1];
      setLatestOrder(latest);
      
    }
  }, []);

  console.log("Latest Order: ", latestOrder);

  return (
    <div className="container mt-4 text-dark">
      <div className="row">
        {/* Left Section: Product Details */}
        <div className="col-md-8">
          <h3 className="mb-4">Order Confirm , deliver within 4 day's</h3>
          {latestOrder && latestOrder.orderItems && latestOrder.orderItems.length > 0 ? (
            <div className="list-group">
              {latestOrder.orderItems.map((data, i) => (
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
        <div className="col-md-4">
          <div className="sticky-top" style={{ top: "20px" }}>
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title text-secondary">Shipping Address</h5>
                <hr />
                {latestOrder && latestOrder.userShippingaddress && (
                  <>
                    <p className="card-text mb-2">
                      <strong>Name:</strong> {latestOrder.userShippingaddress.fullname}
                    </p>
                    <p className="card-text mb-2">
                      <strong>Address:</strong> {latestOrder.userShippingaddress.address}
                    </p>
                    <p className="card-text mb-2">
                      <strong>City:</strong> {latestOrder.userShippingaddress.city}
                    </p>
                    <p className="card-text mb-2">
                      <strong>State:</strong> {latestOrder.userShippingaddress.state}
                    </p>
                    <p className="card-text mb-2">
                      <strong>ZIP Code:</strong> {latestOrder.userShippingaddress.pincode}
                    </p>
                    <p className="card-text mb-3">
                      <strong>Phone:</strong> {latestOrder.userShippingaddress.phoneNumber}
                    </p>
                  </>
                )}

                {/* Payment Summary Section */}
                <div className="mt-4">
                  <h5 className="text-secondary">Payment Information</h5>
                  <hr />
                  {latestOrder && (
                    <>
                      <p className="card-text mb-2">
                        order_id : {latestOrder.order_id}
                      </p>
                      <p className="card-text mb-2">
                    payment_id : {latestOrder.payment_id}
                      </p>
                      {/* <p className="card-text mb-2">
                        payment_signature : {latestOrder.
payment_signature
}
                      </p> */}
                      <hr />
                      <p className="card-text mb-2">
                        <strong>Total Amount:</strong> ₹.{latestOrder.amount}
                      </p>
                    </>
                  )}
                </div>

              
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
