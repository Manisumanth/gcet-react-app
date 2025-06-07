import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const [msg, setMsg] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ email: "", pass: "", name: "" });
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/users/login`, {
        email: formData.email,
        pass: formData.pass,
      });

      if (res.data.email) {
        setUser(res.data);
        setMsg("");
        navigate("/");
      } else {
        setMsg("Invalid email or password");
      }
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.pass) {
      setMsg("Please fill all fields for registration");
      return;
    }
    try {
      await axios.post(`${API}/users/register`, formData);
      setMsg("Registration successful! Please login.");
      setIsRegistering(false);
      setFormData({ email: formData.email, pass: "", name: "" });
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: "400px" }}>
      <h3>{isRegistering ? "Register" : "Login"}</h3>
      {msg && <p style={{ color: "red" }}>{msg}</p>}

      {isRegistering && (
        <p>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </p>
      )}

      <p>
        <input
          type="text"
          placeholder="Email address"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
      </p>

      <p>
        <input
          type="password"
          placeholder="Password"
          value={formData.pass}
          onChange={(e) =>
            setFormData({ ...formData, pass: e.target.value })
          }
        />
      </p>

      {!isRegistering ? (
        <>
          <button onClick={handleLogin}>Login</button>
          <p style={{ marginTop: "15px" }}>
            Don't have an account?{" "}
            <button
              style={{ background: "none", border: "none", color: "#0077cc", cursor: "pointer" }}
              onClick={() => {
                setMsg("");
                setIsRegistering(true);
              }}
            >
              Register here
            </button>
          </p>
        </>
      ) : (
        <>
          <button onClick={handleRegister}>Register</button>
          <p style={{ marginTop: "15px" }}>
            Already have an account?{" "}
            <button
              style={{ background: "none", border: "none", color: "#0077cc", cursor: "pointer" }}
              onClick={() => {
                setMsg("");
                setIsRegistering(false);
              }}
            >
              Login here
            </button>
          </p>
        </>
      )}
    </div>
  );
}
