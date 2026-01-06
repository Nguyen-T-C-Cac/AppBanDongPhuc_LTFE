import React from "react";
import { ReactComponent as CartIcon } from "../../assets/icon/products/cart.svg"
const ProductCard = ({ name, price, image }: any) => {
    return (
        <div className="product-card">
            <img src={image} alt={name}/>
            <p className="product-name">{name}</p>
            <span className="product-price">{price.toLocaleString()} VND</span>

            {/*<div className="add-cart">
                <CartIcon width="18px" height="18px"/>
            </div>*/}
        </div>
    );
};
export default ProductCard;