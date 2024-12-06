import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
const AppState = ({ children }) => {
  const url = "http://localhost:1000/api";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${url}/product/getallproduct`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        const res = response.data;
        setProducts(res.products);
        // console.log(res);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // console.log(products);
  
  return (
    <AppContext.Provider value={{ products }}>{children}</AppContext.Provider>
  );
};

export default AppState;
