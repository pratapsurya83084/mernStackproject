import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ShowProducts = () => {
  const { products, addToCart } = useContext(AppContext);
// console.log(addToCart);




  return (
    <div className="container mt-4 text-dark">
      <ToastContainer />
      <h3 className="mb-3">Top Offers</h3>
      <div className="row">
        {products.map((product) => (
          <div
            key={product._id}
            className="col-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch"
          >
            <div className="card w-100">
              <Link to={`/productDetailpage/${product._id}`}>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    height: "200px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={product.imgsrc}
                    className="img-fluid"
                    alt={product.title}
                    style={{
                      objectFit: "cover",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                  />
                </div>
              </Link>

              <div className="card-body text-center p-2">
                <h5
                  className="card-title mb-2"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  {product.title}
                </h5>
                <p className="text-primary mb-3" style={{ fontSize: "0.9rem" }}>
                  ₹{product.price}
                </p>

                {localStorage.getItem("token") ? (
                  <button
                    className="btn btn-primary btn-sm"
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
                    <button className="btn btn-secondary btn-sm bg-primary">
                      Add to Cart
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProducts;
