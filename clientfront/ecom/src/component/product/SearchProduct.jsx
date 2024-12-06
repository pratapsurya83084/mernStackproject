import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const SearchProduct = () => {
  const { products } = useContext(AppContext);
  const { searchTerm } = useParams();
  // console.log(products);
  const gifUrl = "https://path-to-your-gif-image/not-found.gif";

  // Find the product by ID
  const product = products.find((product) => product.title === searchTerm);
  const relatedprod = products.filter(
    (related) => related.category === product.category
  );
  //  console.log(relatedprod);
console.log(product);

  // If the product is not found, show a loading or error message
  if (!relatedprod) {
    return (
    
        <div className="product-not-found">
        {/* <p>Product not found!</p> */}
        <img src={gifUrl} alt="Product not found" />
      </div>
  
  )}

  return (
    <div className="container mt-5">
      {/* Product Detail Section */}
    

      {/* --------------------------related Products--------------  */}
      <div className="mt-5">
        {/* <h4 className="text-light align-items-center text-center display-4  fw-bold ">
          Related Products
        </h4> */}
        <p className="text-light">{product.detailedDescription}</p>

        <div className="row justify-content-center">
          {relatedprod.map((product) => (
            <div
              key={product._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
            >
              <div
                className="card bg-dark text-light text-center"
                style={{ width: "100%" }}
              >
                <Link to={`/productDetailpage/${product._id}`}>
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={product.imgsrc}
                      className="card-img-top"
                      alt={product.title}
                      style={{
                        width: "100%", // Ensure the image takes full width of the card
                        height: "300px", // Set a consistent height for the images
                        objectFit: "cover", // Ensure the image covers the container without distortion
                        borderRadius: "10px",
                        border: "10px solid white",
                      }}
                    />
                  </div>
                </Link>

                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p>₹.{product.price}</p>
                  <button className="btn btn-purple text-light">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     </div>
  );
};

export default SearchProduct;
