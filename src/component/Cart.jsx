import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const {
    cartProduct,
    removeItemfromCart,
    decreaseQty,
    increaseQty,
    clearCartAll,
    addressinfo,
    UserAddress,
    
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState(cartProduct);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const [updatedCart, setUpdatedCart] = useState(cartProduct);

  // take a address information
  const [address, setAddress] = useState({
    fullname: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  useEffect(() => {
    setProducts(cartProduct);
  }, [cartProduct]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = products.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [products]);


  // add useeffect hook

  const handleRemoveItem = (productId) => {
    removeItemfromCart(productId);
    toast.success("Successfully removed item from cart!");
   window.location.reload();
  };
  


 const handleIncreaseQty = async (productId, qty) => {
  try {
    await increaseQty(productId, qty);

   
  } catch (error) {
    console.error("Error updating quantity: ", error);
  }
};



  const handleDecreaseQty =async (productId,qty) => {
  
    await decreaseQty(productId, qty);

  };

  const clearAllCart = () => {
    clearCartAll();
    setTimeout(() => {
     navigate('/');
    }, 2000);
    toast.success("Clear cart successFully!");
  };

  const handleProceedToCheckout = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const AddressInfo = (e) => {
    e.preventDefault();
    // console.log("user address details : ",address);
   
  };

  const addAddressInfo = (fullname, address, city, state, country, pincode, phoneNumber) => {
    // Validate that all fields are provided and the phone number is exactly 10 digits
    if (
      fullname &&
      address &&
      city &&
      state &&
      country &&
      pincode &&
      phoneNumber &&
      phoneNumber.length === 10
    ) {
      // Proceed to submit the address information
      addressinfo(fullname, address, city, state, country, pincode, phoneNumber)
       
    
          // Redirect to the checkout page after a short delay
          setTimeout(() => {
        
            console.log("Redirected to checkout");
            navigate('/checkout');
            
          }, 1000);
        
       
    } else {
      // Display an error if validation fails
      toast.error("Please enter all fields correctly.");
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  return (
    <div>
      <ToastContainer />
      {products.length ? (
        <div className="container my-5">
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <h2 className="mb-4 text-dark">Shopping Cart</h2>
            <button
              onClick={clearAllCart}
              className=""
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "10px",
                height: "40px",
              }}
            >
              Clear Cart
            </button>
          </div>
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
                {products.map((item) => (
                  <tr key={item.productid}>
                    <td>
                      <img
                        src={item.imgsrc}
                        alt="Product"
                        style={{ height: "70px", width: "60px" }}
                        className="img-fluid"
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>₹{item.price}</td>
                    <td className="d-flex justify-content-between align-items-center">
                      <button
                        onClick={() =>
                          handleIncreaseQty(item.productid, item.qty)
                        }
                      >
                        +
                      </button>
                      <p>{item.qty}</p>
                      <button
                        onClick={() =>
                          handleDecreaseQty(item.productid, item.qty)
                        }
                      >
                        -
                      </button>
                    </td>
                    <td>
                      <svg
                        onClick={() => handleRemoveItem(item.productid)}
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <h5 className="mb-3 text-dark">Cart Total</h5>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total Price</span>
                  <strong>₹{totalPrice}</strong>
                </li>
              </ul>
              <button
                className="btn btn-success w-100 mt-3"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: "100px",
            color: "black",
          }}
        >
          <div style={{ marginBottom: "20px", fontSize: "20px" }}>
            Not products found in cart
          </div>
          <img
            src="\gifImg.gif"
            alt="No Products"
            style={{ width: "300px", height: "300px" }}
          />
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block text-dark"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Proceed to Checkout</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>


              <div className="modal-body">
                <form onSubmit={AddressInfo}>
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="Enter your full name"
                      name="fullname"
                      value={address.fullname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      placeholder="Enter your country"
                      name="country"
                      value={address.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      placeholder="Enter your state"
                      name="state"
                      value={address.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="Enter your city"
                      name="city"
                      value={address.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pincode" className="form-label">
                      Pincode
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="pincode"
                      placeholder="Enter your pincode"
                      name="pincode"
                      value={address.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label">
          Phone Number
        </label>
        <input
          type="number"
          className="form-control"
          id="phoneNumber"
          placeholder="Enter your phone number"
          name="phoneNumber"
          value={address.phoneNumber}
          onChange={handleInputChange}
          required
        />
        {address.phoneNumber.length > 0 && address.phoneNumber.length !== 10 && (
          <small className="text-danger">Phone number must be 10 digits.</small>
        )}
      </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <textarea
                      className="form-control"
                      id="address"
                      rows="2"
                      placeholder="Enter your address"
                      name="address"
                      value={address.address}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  <div
                    className="modal-footer "
                    style={{ justifyContent: "center", fontWeight: "bold" }}
                  >
                    {UserAddress && (
                      <div className=" ">
                        <button
                          className="btn btn-warning"
                          onClick={() => navigate("/checkout")}
                          style={{
                            height: "40px",
                            width: "",
                            fontSize: "15px",
                          }}
                        >
                          old address
                        </button>
                      </div>
                    )}
                    <button
                      onClick={() =>
                        addAddressInfo(
                          address.fullname,
                          address.address,
                          address.city,
                          address.state,
                          address.country,
                          address.pincode,
                          address.phoneNumber
                        )
                      }
                      type="submit"
                      className="btn btn-primary"
                      style={{ height: "40px", width: "", fontSize: "15px" }}
                    >
                      Confirm Order
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
