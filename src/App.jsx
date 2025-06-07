import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Orders from "./components/Orders";

export const AppContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) setCart(savedCart);
  }, []);

  // Save user and cart to localStorage when changed
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (cart.length) localStorage.setItem("cart", JSON.stringify(cart));
    else localStorage.removeItem("cart");
  }, [cart]);

  return (
    <AppContext.Provider value={{ user, setUser, cart, setCart }}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}
