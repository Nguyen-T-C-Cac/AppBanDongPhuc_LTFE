import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from "../assets/icon/login/google.png";
import facebookIcon from "../assets/icon/login/facebook.png";
import "../styles/Signup.css";

function SignupPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    navigate("/home");
    return (
        <div className="signup-page">
            <div className="signup-name">
                <h1>SIGN UP</h1>
            </div>

            <div className="signup-form">
                <div className="input-group">
                    <span className="input-icon">
                        <i className="fa fa-user"></i>
                    </span>
                    <input
                        type="text"
                        placeholder="Enter your email or username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <span className="input-icon">
                        <i className="fa fa-lock"></i>
                    </span>
                    <input
                        type="password"
                        placeholder="Create your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <span className="input-icon">
                        <i className="fa fa-lock"></i>
                    </span>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className="signup-bnt">
                <button
                    className="signup-btn-main"
                    onClick={() => console.log("Signup:", userName, password)}
                >
                    Sign Up
                </button>

                <h3>OR</h3>

                <button className="social-btn google">
                    <img src={googleIcon} alt="Google" className="social-icon" />
                    Continue with Google
                </button>

                <button className="social-btn facebook">
                    <img src={facebookIcon} alt="Facebook" className="social-icon" />
                    Continue with Facebook
                </button>

            </div>

            <div className="signup-register">
                <span>Already have an account?</span>
                <a href="/login" className="register-link">
                    Log in
                </a>
            </div>
        </div>
    );
}

export default SignupPage;
