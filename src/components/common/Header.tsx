// Header.tsx
import React from 'react';
import { useDispatch } from "react-redux";
import { setKeyword, clearKeyword } from "../redux/Search";
import { useState } from 'react'; //bật/tắt ô search
import { useNavigate } from 'react-router-dom';

import logoHeader from '../../assets/logo.png'
import search from '../../assets/icon/header/search.svg'
import cartIcon from '../../assets/icon/header/cart.svg'

const Header: React.FC = () => {
    const [showSearch, setShowSearch] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (<div className="header">
          <img src={logoHeader} alt="logo"
               className="header-logo"
               onClick={() => navigate('/home')}/>

            <div className="header-right">
                {/* Search input */}
                {showSearch && (
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search products..."
                        autoFocus
                        onChange={(e) =>
                            dispatch(setKeyword(e.target.value.trim()))
                        }
                    />
                )}
                <img src={search} alt="search" onClick={() => {setShowSearch(!showSearch);
                    if (showSearch) dispatch(clearKeyword());}}
                />
                <img src={cartIcon} alt="cart" onClick={() => navigate('/cart')}/>
            </div>
        </div>
    );
};

export default Header;
