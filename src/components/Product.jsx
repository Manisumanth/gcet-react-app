import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "../App.css";
import "./Product.css";

export default function Product() {
  const { user, cart, setCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const API = import.meta.env.VITE_API_URL;
  const scrollRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(p => p._id === product._id);
    if (existingProductIndex !== -1) {
      const newCart = [...cart];
      newCart[existingProductIndex].quantity = (newCart[existingProductIndex].quantity || 1) + 1;
      setCart(newCart);
    } else {
      setCart(prev => [...prev, { ...product, quantity: 1 }]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="product-page">
      {user && <h2 className="form-title">Welcome, {user.name}!</h2>}
      <p style={{ color: "#d86c7a" }}>Explore Our Premium Watches</p>

      <div className="carousel-wrapper">
        <button className="arrow left" onClick={() => scroll("left")}>←</button>

        <div className="product-carousel" ref={scrollRef}>
          {products.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} className="product-img" />
              <h4>{product.name}</h4>
              <p className="desc">{product.description}</p>
              <p className="price">₹{product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>

        <button className="arrow right" onClick={() => scroll("right")}>→</button>
      </div>
    </div>
  );
}
