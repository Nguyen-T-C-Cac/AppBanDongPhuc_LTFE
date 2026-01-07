import React, {useState} from 'react';
import CategoryCard from './CategoryCard';
import ProductGrid from './ProductGrid';
import ProductTypeList from './ProductTypeList';
import uniforms from "../../data/uniforms";
import { Product } from "../../types/ProductType";
import { useSelector } from "react-redux";
import { RootState } from "../../components/redux/Store";
import '../../styles/products.css'

const Products: React.FC = () => {
    const keyword = useSelector(
        (state: RootState) => state.search.keyword
    );

    const [selectedType, setSelectedType] = useState<string | null>(null);

    const filteredProducts = uniforms.filter(
            u => {
                const mType = selectedType
                    ? u.types.includes(selectedType)
                    : true;
                const mKeyword = keyword
                    ? u.name.toLowerCase().includes(keyword.toLowerCase())
                    : true;
            return mType && mKeyword;
            });
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
            <ProductGrid products={filteredProducts as Product[]} />

        </div>
    );
};
export default Products;