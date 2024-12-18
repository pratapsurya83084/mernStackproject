import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate(); // UseNavigate hook to navigate to home page after clearing cart
  const {
    cartProduct,
    removeItemfromCart,
    decreaseQty,
    increaseQty,
    clearCartAll,
  } = useContext(AppContext);
  const [products, setProducts] = useState(cartProduct);
  const [totalPrice, setTotalPrice] = useState(0);
  




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

  const handleRemoveItem = (productId) => {
    removeItemfromCart(productId); // Remove item from cart
    toast.success("Successfully removed item from cart!"); // Show success message
   setTimeout(()=>{
    window.location.reload();
   },1000)
  };

  const handleIncreaseQty = (productId, qty) => {
    increaseQty(productId, qty); // Increase quantity
    window.location.reload();
   
  };

  const handleDecreaseQty = (productId, qty) => {
    decreaseQty(productId, qty); // Decrease quantity
    window.location.reload();
  };

  const clearAllCart = () => {
    clearCartAll();
    
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 2000);
    toast.success("Clear cart successFully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
   
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
          </div>{" "}
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
              <button className="btn btn-success w-100 mt-3">
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
            Not  products found in cart
          </div>
          <img
            src="\gifImg.gif"
            alt="No Products"
            style={{ width: "300px", height: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
