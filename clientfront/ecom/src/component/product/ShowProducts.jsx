import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
const ShowProducts = () => {
  const { products } = useContext(AppContext);
  // console.log(products);

  return (
    <div className="container mt-4 mx-auto px-4">
    <div className="row justify-content-center">
      {products.map((product) => (
        <div
          key={product._id}
          className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
        >
          <div className="card bg-dark text-light text-center" style={{ width: "100%" }}>
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
              <button className="btn btn-purple text-light">Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  
  );
};

export default ShowProducts;
