import React, { useContext } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowProducts from "./component/product/ShowProducts";
import Login from "./component/user/Login";
import Register from "./component/user/Register";
import SinglepageProd from "./component/product/SinglepageProd";
import Navbar from "./component/Navbar";
import SearchProduct from "./component/product/SearchProduct";
import Profile from "./component//user/Profile";
import ProtectedRoute from "./component/protectRoutes/ProtectedRouted";
import Cart from './component/Cart';
import  Checkout  from './component/Checkout';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ShowProducts />} />

        <Route path="/productDetailpage/:id" element={<SinglepageProd />} />
        <Route path="/product/search/:Term" element={<SearchProduct />} />
        <Route path="/login" element={<Login />} />
        {/* protected 2 routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              {" "}
              <Cart />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              {" "}
              <Profile />{" "}
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
