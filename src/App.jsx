import { useState, createContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";


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
          </Routes>
        </main>

        <Footer /> 
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;