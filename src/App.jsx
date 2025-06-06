import { useState, createContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Logout from "./components/Logout";
import Product from "./components/Product";
import Register from "./components/Register";
import Login from "./components/Login";
import Orders from "./components/Orders";


export const AppContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ users, setUsers, user, setUser }}>
      <BrowserRouter>
        <Header /> 
        <main>
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>

        <Footer /> 
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;