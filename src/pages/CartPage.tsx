import React from 'react';
import '../styles/cart.css'
import PageHeader from "../components/common/PageHeader";
import Navbar from "../components/common/Navbar";

const Cart = () => {
    const count= 3;
    return (<div className="cart">
        <PageHeader
            title="Shopping Cart"
            count={count}
        />

        <Navbar />
    </div>)
}
export default Cart;