import React, { useContext } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./component/user/Login";
import Register from "./component/user/Register";
import SinglepageProd from "./component/product/SinglepageProd";
import Navbar from "./component/Navbar";
import SearchProduct from "./component/product/SearchProduct";
import Profile from "./component//user/Profile";
import ProtectedRoute from "./component/protectRoutes/ProtectedRouted";
import Cart from './component/Cart';
import  Checkout  from './component/Checkout';
import Homepage from './component/Homepage';
import Footer from './component/Footer';
import OrderConfirmation from './component/OrderConfirmation';
import Grocery from "./component/category/Grocery";
import Mobiles from "./component/category/Mobiles";
import Fashion from "./component/category/Fashion";
import Electronics from "./component/category/Electronics";
import Applience from "./component/category/Applience";
import Furniture from "./component/category/Furniture";
import ToyAndBeauty from "./component/category/ToyAndBeauty";
import Dashboard from './admin/Dashboard'
import AdminLogin from "./component/protectRoutes/AdminLogin";
function App() {
  return (
    
 <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />

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
        <Route path="/profile"element={<ProtectedRoute><Profile /></ProtectedRoute>}/>

        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />
        {/* all category */}
        <Route path="/grocery" element={<Grocery />} />
        <Route path="/mobiles" element={<Mobiles />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/applience" element={<Applience />} />
        <Route path="/home&furnitures" element={<Furniture />} />
        <Route path="/beauty&toy" element={<ToyAndBeauty />} />
        
        <Route path="/admin" element={<AdminLogin> <Dashboard />  </AdminLogin>} />
       
      </Routes>
      <Footer/>
    </Router>

   
  );
}

export default App;
