import React, {useState} from 'react';
import CategoryCard from './CategoryCard';
import ProductGrid from './ProductGrid';
import ProductTypeList from './ProductTypeList';
import uniforms from "../../data/uniforms";

import '../../styles/products.css'

const Products: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const filteredProducts = selectedType
        ? uniforms.filter(
            u => u.types.includes(selectedType)
        )
        : uniforms;
    return (
        <div className="products-page">
            <CategoryCard/>

            <h3 className="section-title">PRODUCT TYPES</h3>
            <ProductTypeList
                selectedType={selectedType}
                onSelect={setSelectedType}
            />
            <div className="section-title">
                {selectedType ? selectedType.toUpperCase() : "MOST POPULAR UNIFORMS"}
            </div>
            <ProductGrid products={filteredProducts}/>

        </div>
    );
};
export default Products;