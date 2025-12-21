import React from 'react';
import {NavLink} from 'react-router-dom';
import homeIcon from '../../assets/icon/nav-bottom/home.svg';
import productsIcon from '../../assets/icon/nav-bottom/products.svg';
import ordersIcon from '../../assets/icon/nav-bottom/orders.svg';
import userIcon from '../../assets/icon/nav-bottom/user.svg';

const Navbar: React.FC = () => {

    return (<div className="bottom-navbar">
            <NavLink to="/home" className={({isActive}) => isActive ? 'nav-bottom-item active' : 'nav-bottom-item'}>
                <img src={homeIcon} alt="home logo"/>
                <span>Home</span>
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-bottom-item active' : 'nav-bottom-item'}>
                <img src={productsIcon} alt="products logo"/>
                <span>Products</span>
            </NavLink>
            <NavLink to="/orders" className={({ isActive }) => isActive ? 'nav-bottom-item active' : 'nav-bottom-item'}>
                <img src={ordersIcon} alt="orders logo"/>
                <span>Orders</span>
            </NavLink>
            <NavLink to="/account" className={({ isActive }) => isActive ? 'nav-bottom-item active' : 'nav-bottom-item'}>
                <img src={userIcon} alt="user logo"/>
                <span>Account</span>
            </NavLink>
        </div>
    );
};

export default Navbar;