import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const SearchProduct = () => {
  const { products } = useContext(AppContext);
  const { Term } = useParams();
  const [searchProducts, setsearchProducts] = useState([]);

  useEffect(() => {
    setsearchProducts(
      products.filter((data) =>
        data?.category?.toLowerCase().includes(Term.toLocaleLowerCase())
      )
    );
  }, [Term, products]);

  if (!products || products.length === 0) {
    return (
      <div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {searchProducts.length > 0 ? (
        <div className="mt-5">
          <div className="row justify-content-center">
            {searchProducts.map((product) => (
              <div
                key={product._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center custom-cards"
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
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
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
      ) : (
        <div className="text-center mt-5">
  <h4 className="text-light">Product not found</h4>
  <img
    style={{
      width: "100%",
      maxWidth: "300px", // Maximum width of the image
      height: "auto", // Maintain aspect ratio
    }}
    src="https://damodarart.weebly.com/uploads/3/9/7/5/3975487/1759326.gif"
    alt="Product not found"
  />
</div>

      )}
    </div>
  );
};

export default SearchProduct;
