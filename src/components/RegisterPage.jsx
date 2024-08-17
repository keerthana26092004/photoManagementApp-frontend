import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { setToken } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            username: username,
            email: email,
            password: password,
        };
        console.log("Payload:", payload);

        try {
            const res = await axios.post("http://localhost:8000/register", payload);
            console.log("register=>", res);
            dispatch(setToken(res.data.token));
            localStorage.setItem("token", res.data.token);
            navigate("/upload");
            toast.success("Registration successful");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="form-button">Register</button>
            </form>
            <p className="register-footer">
                Already have an account? <Link to="/login" className="login-link">Login here</Link>
            </p>
        </div>
    );
}

export default Register;
