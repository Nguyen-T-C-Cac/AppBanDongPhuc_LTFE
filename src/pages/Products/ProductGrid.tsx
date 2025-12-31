import React from "react";
import uniforms from '../../data/uniforms';
import ProductCard from './ProductCard';
interface Props {
    products: any[];
}

const ProductGrid=({ products }: Props) => {
    return (
        <div className="product-grid">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
                />
            ))}
        </div>
    );
};

export default ProductGrid;