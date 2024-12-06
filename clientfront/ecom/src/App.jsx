import React, { useContext } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowProducts from "./component/product/ShowProducts";
import Login from './component/user/Login';
import Register from './component/user/Register';
import SinglepageProd from "./component/product/SinglepageProd";
import Navbar from "./component/Navbar";
import SearchProduct from "./component/product/SearchProduct";

function App() {
  return (
  
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<ShowProducts />} />
         
          <Route path="/productDetailpage/:id" element={<SinglepageProd />} />
          <Route path="/product/search/:searchTerm" element={<SearchProduct />} />
         
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </Router>
    
  );
}

export default App;
