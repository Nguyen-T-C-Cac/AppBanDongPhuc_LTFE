import React, { useState } from "react";
import googleIcon from "../assets/icon/login/google.png";
import facebookIcon from "../assets/icon/login/facebook.png";
import { accountData } from "../data/account";
import "../styles/Login.css";

function LoginPage() {
    const [userName, setUserName] = useState(accountData.user.name);
    const [password, setPassword] = useState(accountData.user.pass);
    return (
        <div className = "login-page">
            <div className = "login-name">
                <h1>LOGIN</h1>
            </div>
            <div className = "login-form">
                <div className="input-group">
                    <span className="input-icon">
                        <i className="fa fa-user"></i>
                    </span>
                    <input type="text" placeholder="Enter your mail / username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <span className="input-icon">
                        <i className="fa fa-lock"></i>
                    </span>
                    <input type="password" placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className = "login-options">
                    <label className="remember-password">
                        <input type="checkbox" />
                        Remember password
                    </label>
                    <a href="/forgot-password" className="forgot-password">
                        Forgot password?
                    </a>
                </div>
            </div>

            <div className = "login-bnt">
                <button className="login-btn-main" onClick={() => console.log(userName, password)}>Log In
                </button>
                <h3>OR</h3>
                <button className="social-btn google">
                    <img src= {googleIcon} alt="Google" className="social-icon"/>
                    Continue with Google
                </button>
                <button className="social-btn facebook">
                    <img src= {facebookIcon} alt="Facebook" className="social-icon"
                    />
                    Continue with Facebook
                </button>
            </div>

            <div className="login-register">
                <span>Don’t have an account?</span>
                <a href="/signup" className="register-link">
                    Sign up
                </a>
            </div>
        </div>
    );
}
export default LoginPage;