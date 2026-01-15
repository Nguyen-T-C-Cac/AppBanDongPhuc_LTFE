import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import {FaFacebookF, FaGoogle} from "react-icons/fa";

function SignupPage() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = () => {
        if (!userName || !email || !password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const newUser = {
            id:Date.now(),
            username: userName.trim(),
            email: email.trim(),
            password,
            phone: "",
            address: "",
            avatar: "",
            isLogin: false,
        };

        const accounts = JSON.parse(
            localStorage.getItem("accounts") || "[]"
        );

        accounts.push(newUser);

        localStorage.setItem("accounts", JSON.stringify(accounts));

        navigate("/login");
    };

    return (
        <div className="signup-page">
            <div className="signup-name">
                <h1>SIGN UP</h1>
            </div>

            <div className="signup-form">
                <div className="input-group">
                    <span className="input-icon"><i className="fa fa-user"></i></span>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <span className="input-icon"><i className="fa fa-envelope"></i></span>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <span className="input-icon"><i className="fa fa-lock"></i></span>
                    <input
                        type="password"
                        placeholder="Create your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <span className="input-icon"><i className="fa fa-lock"></i></span>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className="signup-bnt">
                <button className="signup-btn-main" onClick={handleSignup}>
                    Sign Up
                </button>

                <h3>OR</h3>

                <button className="social-btn google">
                    <FaGoogle className="social-icon" />
                    Continue with Google
                </button>

                <button className="social-btn facebook">
                    <FaFacebookF className="social-icon" />
                    Continue with Facebook
                </button>
            </div>

            <div className="signup-register">
                <span>Already have an account? </span>
                <span
                    className="register-link"
                    onClick={() => navigate("/login")}
                    style={{ cursor: "pointer", color: "#2f80ed" }}
                >
                    Log in
                </span>
            </div>
        </div>
    );
}

export default SignupPage;
