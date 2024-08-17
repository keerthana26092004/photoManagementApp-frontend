import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setToken } from '../redux/userSlice';
import { Link } from 'react-router-dom';
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("return_to") || "/upload";

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    try {
      const res = await axios.post("http://localhost:8000/login", payload);
      dispatch(setToken(res.data.token));
      localStorage.setItem("token", res.data.token);
      navigate(returnTo);
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-page">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="primary-btn">Login</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
