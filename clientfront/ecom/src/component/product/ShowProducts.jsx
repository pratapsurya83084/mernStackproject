import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const ShowProducts = () => {
  const { products, addToCart } = useContext(AppContext);
 

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        {products.map((product) => (
          <div
            key={product._id}
            className="col-6 col-md-4 col-lg-3 mb-4 custom-card"
          >
            <div className="card text-center bg-dark text-light shadow-sm">
              <Link to={`/productDetailpage/${product._id}`}>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src={product.imgsrc}
                    className="card-img-top rounded border"
                    alt={product.title}
                    style={{
                      height: "150px", // Adjusted height for smaller images
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Link>
              <div className="card-body p-2">
                <h5 className="card-title mb-2" style={{ fontSize: "0.9rem" }}>
                  {product.title}
                </h5>
                <p className="text-primary mb-2" style={{ fontSize: "0.8rem" }}>
                  ₹{product.price}
                </p>

                {localStorage.getItem("token") ? (
                  <button
                    className="btn btn-sm btn-primary"
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
                 <Link to="/login">
                 <button className="btn btn-sm btn-primary" disabled>
                    Add to Cart
                  </button>
                  </Link>
                )}
                <ToastContainer/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProducts;
