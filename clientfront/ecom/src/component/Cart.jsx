import React, { useState, useContext } from "react";
import AppContext from "../context/AppContext";

const Cart = () => {
  const { cartProduct } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Product 1",
      price: 100,
      quantity: 1,
      img: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      title: "Product 2",
      price: 150,
      quantity: 2,
      img: "https://via.placeholder.com/80",
    },
  ]);

  console.log(cartProduct.cart.items);
 


  // Function to update quantity
  const updateQuantity = (id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "increment"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  // Function to calculate total
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Function to remove item
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center">Your cart is empty!</div>
      ) : (
        <>
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="d-flex align-items-center">
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{ width: "80px", marginRight: "10px" }}
                    />
                    {item.title}
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-secondary me-2"
                        onClick={() => updateQuantity(item.id, "decrement")}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-secondary ms-2"
                        onClick={() => updateQuantity(item.id, "increment")}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Total: ${calculateTotal()}</h4>
            <button className="btn btn-primary btn-lg">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
