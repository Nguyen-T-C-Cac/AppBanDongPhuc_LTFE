import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
interface ProductCardProps {
    id: number;  // cần thêm id
    name: string;
    price: number;
    image: string;
}
const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
    return (
        <Link to={`/product/${id}`} className="product-card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{price.toLocaleString()} VND</p>
        </Link>
    );
};


export default ProductCard;
