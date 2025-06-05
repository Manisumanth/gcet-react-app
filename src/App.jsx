import { useState, createContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Footer from "./components/Footer";
import Header from "./components/Header";

import Logout from "./components/Logout";
import Product from "./components/Product";
import Register from "./components/Register";


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
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <Footer /> 
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;