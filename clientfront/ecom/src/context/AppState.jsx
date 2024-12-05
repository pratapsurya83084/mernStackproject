import React, { useEffect,useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
const AppState = ({ children }) => {
  // const url = "http://localhost:1000/api";
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product"); // Proxy handles "/api"
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return <AppContext.Provider value={{products}}>{children}</AppContext.Provider>;
};

export default AppState;
