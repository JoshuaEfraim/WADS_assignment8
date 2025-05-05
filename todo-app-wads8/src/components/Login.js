import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

import "../styles/Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/user/signin", {
        email,
        password,
      }, { withCredentials: true }); // this sends cookies

      if (res.status === 200) {
        console.log("Logged in:", res.data.user);
        navigate("/dashboard"); // or wherever
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="login__btn" onClick={loginUser} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Optional: Google auth logic would be removed or replaced */}
        {/* <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button> */}

        {error && <div style={{ color: "red" }}>{error}</div>}

        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;
