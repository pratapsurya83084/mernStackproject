import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import UserReviews from "./UserReviews";
const SinglepageProd = () => {
  const { products } = useContext(AppContext);
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

  return (
    <div className="container mt-5">
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
            <button className="btn btn-primary btn-lg">Add to Cart</button>
            <button className="btn btn-success btn-lg m-3">Buy Now</button>
          </div>
        </div>
      </div>

      {/* --------------------------related Products--------------  */}
      <div className="mt-5">
        <h4 className="text-dark align-items-center text-center display-4  fw-bold ">
          Related Products
        </h4>
        <p className="text-light">{product.detailedDescription}</p>

        <div className="container mt-4">
  <div className="row justify-content-center">
    {relatedprod.map((product) => (
      <div key={product._id} className="col-6 col-md-4 col-lg-3 mb-4 custom-card">
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
          <div className="card-body p-2 ">
            <h5 className="card-title mb-2" style={{ fontSize: "0.9rem" }}>
              {product.title}
            </h5>
            <p className="text-primary mb-2" style={{ fontSize: "0.8rem" }}>
              ₹{product.price}
            </p>
            <button className="btn btn-sm btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>

      {/* Product Reviews */}
      <div className="mt-5">
        <h4 className="text-light fs-3">Top reviews from India</h4>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="border p-3 mb-3 rounded">
              <h5>{review.name}</h5>
              <div className="text-light mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <i key={i} className="fa fa-star"></i>
                ))}
              </div>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-light">
            <UserReviews />
            No reviews yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default SinglepageProd;
