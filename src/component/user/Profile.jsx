import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, userOrder } = useContext(AppContext);
  const navigate = useNavigate();
  const [latestOrder, setLatestOrder] = useState(null);

  // Set the latest order from userOrder
  useEffect(() => {
    if (userOrder && userOrder.orderDetails?.length > 0) {
      const latest = userOrder.orderDetails[userOrder.orderDetails.length - 1];
      setLatestOrder(latest);
    }
  }, [userOrder]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-sm profile-card">
            <div className="row g-4 p-4 align-items-center">
              <div className="col-12 col-md-4 text-center">
                <img
                  src={user?.profilePicture || "https://via.placeholder.com/150"}
                  alt="User Profile"
                  className="rounded-circle img-fluid border border-primary"
                />
              </div>
              <div className="col-12 col-md-8 text-center text-md-start">
                <h3 className="profile-header">{user?.name || "N/A"}</h3>
                <p className="profile-subtext">{user?.email || "N/A"}</p>
                <p className="profile-subtext">
                  Login Status: {user?.login || "N/A"}
                </p>
                <button className="btn btn-danger mt-3" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4 text-dark">
        <div className="row">
          <div className="col-md-8">
            <h3 className="mb-4">Your order Items List</h3>
            {latestOrder?.orderItems?.length > 0 ? (
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
                    <p className="text-end mb-1">
                      <strong>Price:</strong> ₹{data.price}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No recent orders found.</p>
            )}
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title text-secondary">Shipping Address</h5>
                <hr />
                {latestOrder?.userShippingaddress ? (
                  <>
                    <p className="card-text mb-2">
                      <strong>Name:</strong>{" "}
                      {latestOrder.userShippingaddress.fullname}
                    </p>
                    <p className="card-text mb-2">
                      <strong>Address:</strong>{" "}
                      {latestOrder.userShippingaddress.address}
                    </p>
                    <p className="card-text mb-2">
                      <strong>City:</strong> {latestOrder.userShippingaddress.city}
                    </p>
                    <p className="card-text mb-2">
                      <strong>State:</strong>{" "}
                      {latestOrder.userShippingaddress.state}
                    </p>
                    <p className="card-text mb-2">
                      <strong>ZIP Code:</strong>{" "}
                      {latestOrder.userShippingaddress.pincode}
                    </p>
                    <p className="card-text mb-3">
                      <strong>Phone:</strong>{" "}
                      {latestOrder.userShippingaddress.phoneNumber}
                    </p>
                  </>
                ) : (
                  <p className="text-muted">No shipping address available.</p>
                )}
                <div className="mt-4">
                  <h5 className="text-secondary">Payment Information</h5>
                  <hr />
                  <p className="card-text mb-2">
                    <strong>Order ID:</strong> {latestOrder?.order_id || "N/A"}
                  </p>
                  <p className="card-text mb-2">
                    <strong>Payment ID:</strong> {latestOrder?.payment_id || "N/A"}
                  </p>
                  <p className="card-text mb-2">
                    <strong>Total Amount:</strong> ₹{latestOrder?.amount || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
