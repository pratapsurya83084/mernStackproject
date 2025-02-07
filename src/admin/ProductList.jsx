import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast ,ToastContainer} from "react-toastify";
const ProductList = () => {
  const [productList, setProductList] = useState([]);
  // console.log(product);
const url="http://localhost:1000/api"
// "https://mernstack1stproject-1.onrender.com/api"
  const getAllProductList = async () => {
    try {
      const api = await axios.get(
        `${url}/product/getallproduct`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProductList(api.data.products); // Update state with fetched products
      // console.log("product  is:",api.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProductList();
  }, []);

const deleteProduct =async(id)=>{
    // console.log("delete product id:",id);
  const deleteProductByidwise = await axios.delete(`${url}/product/${id}`,{
    headers:{
    "Content-Type": "application/json",
    }
  });
  console.log("product delete form productList :",deleteProductByidwise.data);
const deleteProd=await deleteProductByidwise.data.delete;
if (deleteProd === true) {
  toast.success("product deleted successfully from productList")
}
  }
  
  const editProduct =async(id)=>{
alert("edit product id:",id);
  }


  return (
    <div className="container my-4">
      <ToastContainer/>
      <h2 className="text-center mb-4">Product List</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Sr. No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price </th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.qty}</td>
                <td>
                  <img
                    src={product.imgsrc}
                    alt={product.title}
                    className="img-fluid"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>
                  <FaEdit
                    onClick={() => editProduct(product._id)}
                    style={{ cursor: "pointer" }}
                  />{" "}
                  <br />
                  <FaTrash
                    onClick={() => deleteProduct(product._id)}
                    style={{ cursor: "pointer", marginTop: "20px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
