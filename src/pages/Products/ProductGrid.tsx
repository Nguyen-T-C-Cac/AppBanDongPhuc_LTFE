import React from "react";
import { Product } from "../../types/ProductType";

import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

const ProductGrid: React.FC<Props> = ({ products }) => {
    return (
        <div className="product-grid">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    id={product.id}           // thêm dòng này
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
                />
            ))}
        </div>
    );
};

export default ProductGrid;
