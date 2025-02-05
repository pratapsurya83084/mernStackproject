import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { ToastContainer } from "react-toastify";
const ToyAndBeauty = () => {
  const { products ,addToCart} = useContext(AppContext); // Accessing products from the context
  const [maxPrice, setMaxPrice] = useState(40000);

  // Handle price change
  const handlePriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  useEffect(() => {
    console.log(products); // Check if `products` has the correct structure
  }, [products]);
                                                                                 
  
  // Filtered products for the 'phone' category and within the price range
  const filteredProducts = products.filter(
    (product) => product.price <= maxPrice && product.category == "toyandbeauty"
  );

  return (
    <div className="container mt-5">
      <ToastContainer/>
      <h1 className="text-center mb-4" style={{ color: "#4A90E2" }}>
        Smart Phones
      </h1>

      {/* Price Filter Section */}
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <label
            htmlFor="priceFilter"
            className="form-label fw-bold"
            style={{ color: "#333" }}
          >
            Filter by Price:{" "}
            <span style={{ color: "#E94E77" }}>₹{maxPrice}</span>
          </label>
          <input
            type="range"
            className="form-range shadow-sm border border-primary-subtle rounded-pill"
            id="priceFilter"
            min="0"
            max="40000"
            step="100"
            value={maxPrice}
            onChange={handlePriceChange}
            style={{ accentColor: "#4A90E2" }}
          />
        </div>
      </div>

      {/* Product List Section */}
      <div className="row">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <div className="col-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch" key={product.id}>
        <div
          className="card h- shadow"
          style={{
            borderRadius: "10px",
            border: "1px solid #ddd",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Link>
            <img
              src={product.imgsrc}
              className="img-fluid"
              alt={product.title}
              style={{
                objectFit: "contain",  // Makes sure the entire image is shown without overflow
                width: "",         // Ensures the image takes full width of the card
                height: "",        // Automatically adjusts the height while maintaining aspect ratio
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            />
          </Link>
          <div className="card-body text-center">
            <h5 className="card-title fw-bold" style={{ color: "#4A90E2" }}>
              {product.title}
            </h5>
            <p
              className="card-text"
              style={{
                color: "#E94E77",
                fontSize: "1.1rem",
              }}
            >
              ₹{product.price}
            </p>
          </div>
          {/* add to cart button */}
          <div className="card-footer text-center">
                  {localStorage.getItem("token") ? (
                    <button
                      className="btn btn-primary btn-sm"
                      style={{
                        backgroundColor: "#4A90E2",
                        border: "none",
                      }}
                      onClick={() =>
                        addToCart(
                          product.title,
                          product.price,
                          1,
                          product.imgsrc,
                          product._id
                        )
                      }
                    >
                      Add to Cart
                    </button>
                  ) : (
                   <Link to="/login"> <button
                   className="btn btn-primary btn-sm"
                   style={{
                     backgroundColor: "#4A90E2",
                     border: "none",
                   }}
                 >
                   Add to Cart
                 </button></Link>
                  )}
                </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center" style={{ color: "#E94E77", fontSize: "1.2rem" }}>
      No products found within this price range.
    </p>
  )}
</div>

    </div>
  );
};

export default ToyAndBeauty;
