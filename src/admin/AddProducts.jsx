import { useState } from "react";
import axios from "axios";

const AddProducts = () => {
  const url="https://mernstack1stproject-1.onrender.com/api"
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    qty: "",
    imgsrc: "",
    createdAt: new Date().toISOString(), // Automatically set the creation date
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${url}/product/addproducts`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Product added:", response.data);
      alert("Product added successfully!");
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        qty: "",
        imgsrc: "",
        createdAt: new Date().toISOString(), // Reset form with a new timestamp
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="container p-4 shadow rounded bg-white">
  <div className="row g-3">
    {/* Title */}
    <div className="col-12">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Product Title"
        required
        className="form-control"
      />
    </div>

    {/* Description */}
    <div className="col-12">
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Product Description"
        required
        className="form-control"
      />
    </div>

    {/* Price & Category */}
    <div className="col-md-6">
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
        className="form-control"
      />
    </div>
    <div className="col-md-6">
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
        className="form-control"
      />
    </div>

    {/* Quantity & Image Source */}
    <div className="col-md-6">
      <input
        type="number"
        name="qty"
        value={formData.qty}
        onChange={handleChange}
        placeholder="Quantity"
        required
        className="form-control"
      />
    </div>
    <div className="col-md-6">
      <input
        type="text"
        name="imgsrc"
        value={formData.imgsrc}
        onChange={handleChange}
        placeholder="Image URL"
        required
        className="form-control"
      />
    </div>

    {/* Submit Button */}
    <div className="col-12">
      <button type="submit" className="btn btn-primary w-100">
        Add Product
      </button>
    </div>
  </div>
</form>

    </div>
  );
};

export default AddProducts;
