import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import {
  Navbar,
  Nav,
  Container,
  Carousel,
  Card,
  Row,
  Col,
} from "react-bootstrap";

const products = [
  {
    id: 1,
    title: "Smartphone",
    price: 19999,
    category: "Electronics",
    image: "/smartphone.jpg",
  },
  {
    id: 2,
    title: "Laptop",
    price: 59999,
    category: "Electronics",
    image: "/laptop.jpg",
  },
  {
    id: 3,
    title: "T-shirt",
    price: 499,
    category: "Fashion",
    image: "/tshirt.jpg",
  },
  {
    id: 4,
    title: "Jeans",
    price: 1299,
    category: "Fashion",
    image: "/jeans.jpg",
  },
  { id: 5, title: "Sofa", price: 7999, category: "Home", image: "/sofa.jpg" },
  { id: 6, title: "Table", price: 3999, category: "Home", image: "/table.jpg" },
];


const CategoryProduct = () => {
 
  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  
  const SubmitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Prevent submitting empty searches
      navigate(`/product/search/${searchTerm}`);
    }
  };

  return (
    <div>
      
      {/* Category Menu */}
      <Container  
  style={{ backgroundColor: "rgb(243, 246, 246)" }} 
  className="category-all  shadow my-3 flex items-center justify-center "
>
  <div className="category-scroll flex space-x-10 gap-category">
  {/*  */}
      <Link to="/grocery"  style={{ textDecoration: "none" }}>
      <div  className="category-item text-center flex flex-col items-center">
        <img src="https://rukminim1.flixcart.com/flap/80/80/image/29327f40e9c4d26b.png?q=100" alt="category" className="mb-2" />
        <p className="text-dark fs-6">Grocery</p>
      </div>
      </Link>
      {/*  */}
      <Link to="mobiles" style={{ textDecoration: "none" }}>
      <div  className="category-item text-center flex flex-col items-center">
        <img src="https://rukminim2.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100" alt="category" className="mb-2" />
        <p className="text-dark fs-6">Mobiles</p>
      </div>
      </Link>
      
      {/*  */}
     <Link to="fashion" style={{ textDecoration: "none" }}>
     <div  className="category-item text-center flex flex-col items-center">
        <img src="https://rukminim2.flixcart.com/fk-p-flap/80/80/image/0d75b34f7d8fbcb3.png?q=100" alt="category" className="mb-2" />
        <p className="text-dark fs-6">Fashion</p>
      </div>
     </Link>
      {/*  */}
      <Link to="electronics" style={{ textDecoration: "none" }}>
      <div  className="category-item text-center flex flex-col items-center "style={{textDecoration:"none"}} >
        <img src="https://rukminim2.flixcart.com/flap/80/80/image/69c6589653afdb9a.png?q=100" alt="category" className="mb-2" />
        <p className="text-dark fs-6">Electronics</p>
      </div>
      </Link>
      {/*  */}
      <Link to="applience" style={{ textDecoration: "none" }}>
      <div  className="category-item text-center flex flex-col items-center">
        <img src="https://rukminim2.flixcart.com/fk-p-flap/80/80/image/0139228b2f7eb413.jpg?q=100" alt="category" className="mb-2" />
        <p className="text-dark fs-6">Appliences</p>
      </div>
      </Link>
      {/*  */}
     <Link to="home&furnitures" style={{ textDecoration: "none" }}>
     <div  className="category-item text-center flex flex-col items-center">
        <img src="https://rukminim2.flixcart.com/flap/80/80/image/ab7e2b022a4587dd.jpg?q=100" alt="category" className="mb-2" />
        <p className="text-dark fs-6">Home & Furniture</p>
      </div>
     </Link>
      {/*  */}
     <Link to="beauty&toy" style={{ textDecoration: "none" }}>
     <div  className="category-item text-center flex flex-col items-center">
        <img src="https://rukminim2.flixcart.com/flap/80/80/image/dff3f7adcf3a90c6.png?q=100" alt="category" className="mb-2" />
        <p className="text-dark fs-6">Beauty & Toy , More</p>
      </div>
     </Link>

  
  </div>
</Container>


      {/* Banner Carousel */}

      <Carousel 
  className="bg-color-custom shadow " 
  style={{ backgroundColor: "rgb(243, 246, 246)", paddingBottom: "40px" }}
  indicators={true}
>
  {[
    "/Screenshot 2024-12-24 180640.png",
    "/Screenshot 2024-12-24 175915.png",
    "/Screenshot 2024-12-24 175946.png",
    "/Screenshot 2024-12-24 180906.png",
  ].map((banner, index) => (
    <Carousel.Item key={index}>
      <img
        className="carousel-image"
        src={banner}
        alt={`Slide ${index + 1}`}
      />
    </Carousel.Item>
  ))}
</Carousel>

    </div>
  );
};

export default CategoryProduct;
