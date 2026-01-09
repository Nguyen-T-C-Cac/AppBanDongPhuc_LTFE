import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { accountData } from "../data/account";

function LoginPage() {
    const [userNameOrEmail, setUserNameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!userNameOrEmail || !password) {
            alert("Please enter username/email and password");
            return;
        }

        const input = userNameOrEmail.trim().toLowerCase();
        const cleanPassword = password.trim();

        /* 1️⃣ Ưu tiên login user đăng ký (localStorage) */
        const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");

        const foundLocalUser = accounts.find(
            (acc: any) =>
                (acc.username?.toLowerCase() === input ||
                    acc.email?.toLowerCase() === input) &&
                acc.password === cleanPassword
        );

        if (foundLocalUser) {
            localStorage.setItem(
                "currentUser",
                JSON.stringify({ ...foundLocalUser, isLogin: true })
            );
            navigate("/account");
            return;
        }

        /* 2️⃣ Login user mock từ accountData.users */
        const foundMockUser = accountData.users.find(
            (user) =>
                (user.name.toLowerCase() === input ||
                    user.email.toLowerCase() === input) &&
                user.pass === cleanPassword
        );

        if (foundMockUser) {
            localStorage.setItem(
                "currentUser",
                JSON.stringify({
                    ...foundMockUser,
                    isLogin: true,
                    isMock: true,
                })
            );
            navigate("/account");
            return;
        }

        alert("Username / Email or password is incorrect!");
    };

    return (
        <div className="login-page">
            <div className="login-name">
                <h1>LOGIN</h1>
            </div>

            <div className="login-form">
                <div className="input-group">
                    <span className="input-icon">
                        <i className="fa fa-user"></i>
                    </span>
                    <input
                        type="text"
                        placeholder="Enter your username/email"
                        value={userNameOrEmail}
                        onChange={(e) => setUserNameOrEmail(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <span className="input-icon">
                        <i className="fa fa-lock"></i>
                    </span>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="login-options">
                    <label className="remember-password">
                        <input type="checkbox" />
                        Remember password
                    </label>
                    <a href="/forgot-password" className="forgot-password">
                        Forgot password?
                    </a>
                </div>
            </div>

            <div className="login-bnt">
                <button className="login-btn-main" onClick={handleLogin}>
                    Log In
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

            <div className="login-register">
                <span>Don’t have an account? </span>
                <span
                    className="register-link"
                    onClick={() => navigate("/signup")}
                    style={{ cursor: "pointer", color: "#2f80ed" }}
                >
                    Sign up
                </span>
            </div>
        </div>
    );
}

export default LoginPage;
