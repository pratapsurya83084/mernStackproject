import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const SinglepageProd = () => {
  const { products, addToCart } = useContext(AppContext);
  const { id } = useParams();
  // console.log(products);

  // Find the product by ID
  const product = products.find((product) => product._id === id);
  const relatedprod = products.filter(
    (related) => related.category === product.category
  );
  //  console.log(relatedprod);

  // If the product is not found, show a loading or error message
  if (!product) {
    return <div>Product not found!</div>;
  }

  //add to cart
 
  const addedCart = (title,price,qty, imgsrc,id) => {
    addToCart(title,price,qty, imgsrc,id);
      
  };

  return (
    <div className="container mt-5">
       <ToastContainer />
      {/* Product Detail Section */}
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src={product.imgsrc} // Dynamically load the product image
            alt={product.title}
            className="img-fluid rounded shadow w-90 h-"
            style={{ maxHeight: "500px", objectFit: "cover" }} // Fix inline styling
          />
        </div>

        {/* Product Information */}
        <div className="col-md-6">
          <h2 className="text-dark">{product.title}</h2>
          <p className="text-dark">
            Category :{" "}
            <span className="badge badge-info text-dark">
              {product.category}
            </span>
          </p>
          <p className="text-danger h4">₹ {product.price}</p>
          <p className="lead text-dark">{product.description}</p>

          {/* Product Quantity */}
          <div className="mb-4">
            <label htmlFor="quantity" className="form-label text-dark">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="form-control "
              value="1"
              min="1"
              max="100"
            />
          </div>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="flex justify-content-evenly">
            {localStorage.getItem("token") ? (
              <button
                className="btn btn-primary btn-lg"
                onClick={() =>
                  addedCart(
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
                <button className="btn btn-primary btn-lg">Add to Cart</button>
              </Link>
            )}
            {/* <button className="btn btn-success btn-lg m-3">Buy Now</button> */}
          </div>
        </div>
      </div>

      {/* --------------------------related Products--------------  */}
      <div className="mt-5">
        <h4 className="fs-1 text-dark align-items-center text-center display-4  fw-bold ">
          Related Products
        </h4>
        <p className="text-light">{product.detailedDescription}</p>
        
        <div className="row">
                {relatedprod.map((product) => (
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

   
    </div>
  );
};

export default SinglepageProd;
