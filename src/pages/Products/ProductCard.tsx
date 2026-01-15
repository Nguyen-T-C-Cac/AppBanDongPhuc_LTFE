import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    image: string;
}
const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
    return (
        <Link to={`/product/${id}`} className="product-card">
            <img src={image} alt={name}/>
            <p className="product-name">{name}</p>
            <span className="product-price">{price.toLocaleString()} VND</span>
        </Link>

    );
};


export default ProductCard;
