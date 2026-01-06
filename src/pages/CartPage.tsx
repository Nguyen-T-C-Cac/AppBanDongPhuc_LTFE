import React from 'react';
import '../styles/cart.css'
import { RootState } from "../components/redux/Store";
import CartItem from "../components/cart/CartItem";
import PageHeader from "../components/common/PageHeader";
import Navbar from "../components/common/Navbar";
import iconCoin from "../assets/icon/cart/currency-coin-dollar.svg"
import iconShipping from "../assets/icon/cart/delivery.svg"
import {useSelector} from "react-redux";

const Cart = () => {
    const cartItems = useSelector(
        (state: RootState) => state.cart.items
    );
    //Tính tổng tiền
    const totalPrice = cartItems.reduce((total, item) => {
        const itemTotal = item.sizes.reduce((sum, s) => sum + s.quantity, 0) * item.price;
        return total + itemTotal;
    }, 0);
    return (<div className="cart">
        <PageHeader
            title="Shopping Cart"
            count={cartItems.length}
        />
        <div className="cart-list">
            {cartItems.map(item => (
                <CartItem key={item.id} item={item}/>
            ))}
        </div>
        <div className="cart-bottom-section">

            <div className="cart-summary-info">
                <div className="summary-row">
                    <div className="summary-label">
                        <img src={iconCoin} alt="coin"/>
                        <span>Price:</span>
                    </div>
                    <div className="summary-value red">
                        {totalPrice.toLocaleString()} VNĐ
                    </div>
                </div>

                <div className="summary-row">
                    <div className="summary-label">
                        <img src={iconShipping} alt="shipping"/>
                        <span>Shipping:</span>
                    </div>
                    <div className="summary-value green">Free</div>
                </div>
            </div>

            <div className="cart-action-bar">
                <label className="select-all-checkbox">
                    <input type="checkbox"/>
                    <span>All</span>
                </label>

                <button className="checkout-btn">
                    Check out
                </button>
            </div>
        </div>
        <Navbar/>
    </div>)
}
export default Cart;