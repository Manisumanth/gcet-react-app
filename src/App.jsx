import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Product from "./components/product";
import Cart from "./components/cart";
import Login from "./components/login";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <header>
          <h1>React Store</h1>
          <Link to="/">Home</Link>-
          <Link to="/cart">Cart</Link>-
          <Link to="/login">Login</Link>
          <hr />
        </header>

        <main>
          <Routes>
            <Route index element={<Product />} />
            <Route path="/" element={<Product/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
          </Routes>
        </main>

        <footer>
          <hr />
          &copy; 2005. All rights Reserved.
        </footer>
      </BrowserRouter>
    </div>
  );
}
export default App;