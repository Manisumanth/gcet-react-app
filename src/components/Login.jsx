import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const [msg, setMsg] = useState();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  // Ensure user is always initialized to avoid null issues
  const safeUser = user || {};

  const handleSubmit = async () => {
    try {
      const url = `${API}/users/login`;
      const found = await axios.post(url, safeUser);

      if (found.data.email) {
        setUser(found.data);
        navigate("/");
      } else {
        setMsg("Invalid email or password");
      }
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="form-container">
      <h3>Login</h3>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
      <p>
        <input
          type="text"
          placeholder="Email address"
          value={safeUser.email || ""}
          onChange={(e) =>
            setUser({ ...safeUser, email: e.target.value })
          }
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          value={safeUser.pass || ""}
          onChange={(e) =>
            setUser({ ...safeUser, pass: e.target.value })
          }
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>
      <p>
        <button onClick={goToRegister}>Create Account</button>
      </p>
    </div>
  );
}