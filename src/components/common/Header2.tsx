// src/components/common/Header2.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setKeyword, clearKeyword } from "../redux/Search";

/* Icons */
import searchIcon from "../../assets/icon/header/search.svg";
import cartIcon from "../../assets/icon/header/cart.svg";
import "../../styles/header2.css";
interface Header2Props {
    title?: string;
    showBackButton?: boolean;
    showCart?: boolean;
}

const Header2: React.FC<Header2Props> = ({
                                             title = "",
                                             showBackButton = true,
                                             showCart = true,
                                         }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <header className="header">
            {/* Back button */}
            {showBackButton && (
                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    &#8592;
                </button>
            )}

            {/* Right icons */}
            <div className="header-right">
                <div className="header2-right">

                {showCart && (
                    <img
                        src={cartIcon}
                        alt="cart"
                        className="icon"
                        onClick={() => navigate("/cart")}
                    />
                )}
            </div>
            </div>
        </header>
    );
};

export default Header2;
