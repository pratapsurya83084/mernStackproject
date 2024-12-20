import React from "react";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const Checkout = () => {
  const { cartProduct } = useContext(AppContext);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Section: Product Details */}
        <div className="col-md-8">
          <h3 className="mb-4">Your Cart</h3>
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
                      <p className="mb-1">
                        <strong>Price:</strong> ₹{data.price}
                      </p>
                      <p className="mb-0">
                        <strong>Qty:</strong> {data.qty}
                      </p>
                    </div>
                  </div>
                  <div className="text-end">
                    <h5 className="text-success">₹{data.price * data.qty}</h5>
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
                <p className="card-text mb-2">
                  <strong>Name:</strong> John Doe
                </p>
                <p className="card-text mb-2">
                  <strong>Address:</strong> 123 Main Street, Apt 4B
                </p>
                <p className="card-text mb-2">
                  <strong>City:</strong> New York
                </p>
                <p className="card-text mb-2">
                  <strong>State:</strong> NY
                </p>
                <p className="card-text mb-2">
                  <strong>ZIP Code:</strong> 10001
                </p>
                <p className="card-text mb-3">
                  <strong>Phone:</strong> +1 234 567 890
                </p>
                <button className="btn btn-primary w-100"> Proceed to Payment</button>
              </div>
            </div>

         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
