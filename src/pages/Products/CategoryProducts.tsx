import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../components/redux/Store";

import uniforms from "../../data/uniforms";
import ProductCard from "../Products/ProductCard";
import SidebarCategory from "../Products/SidebarCategory";
import types from "../../data/tyles";
import IconMenu from "../../assets/icon/products/fi-br-menu-burger.svg";
import IconUp from "../../assets/icon/products/fi-br-arrow-small-up.svg";
import IconFilter from "../../assets/icon/products/auto_awesome.svg";

interface TypeItem {
    name: string;
    image: string;
}

const CategoryProducts: React.FC = () => {
    const keyword = useSelector((state: RootState) => state.search.keyword);
    const { category } = useParams<{ category: string }>();

    const [openMenu, setOpenMenu] = useState(false);
    const [openStyle, setOpenStyle] = useState(false);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const filteredProducts = uniforms.filter((item) => {
        const mcategory = item.category === category;
        const mtype = selectedType ? item.types?.includes(selectedType) : true;
        const mKeyword = keyword
            ? item.name.toLowerCase().includes(keyword.toLowerCase())
            : true;
        return mcategory && mtype && mKeyword;
    });

    return (
        <div className="category-page">
            <div className="category-header">
                <img
                    src={IconMenu}
                    className="menu-icon"
                    onClick={() => setOpenMenu(true)}
                />
                <h3>{category?.toUpperCase()}</h3>
            </div>

            {/* Tabs */}
            <div className="category-tabs">
                <button className="tab active">Newest</button>
                <button className="tab">Best Sellers</button>
            </div>

            {openMenu && <div className="sidebar-overlay" onClick={() => setOpenMenu(false)} />}

            {/* Sidebar */}
            <div className={`category-sidebar ${openMenu ? "open" : ""}`}>
                <SidebarCategory />
            </div>

            {/* Style filter */}
            <div className="category-styles">
                <img
                    src={IconFilter}
                    className="filter-icon"
                    onClick={() => {
                        if (openStyle) setSelectedType(null); // reset filter nếu đang mở
                        setOpenStyle(!openStyle);
                    }}
                />
                <div className={`style-list ${openStyle ? "open" : "closed"}`}>
                    {types.map((type: TypeItem) => {
                        const isActive = selectedType === type.name;
                        return (
                            <div
                                key={type.name}
                                className={`style-item ${isActive ? "active" : ""}`}
                                onClick={() => setSelectedType(isActive ? null : type.name)}
                            >
                                <img src={type.image} alt={type.name} />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Product grid */}
            <div className="product-grid">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}          // key cho React list
                        id={product.id}           // thêm dòng này để match với ProductCardProps
                        name={product.name}
                        price={product.price}
                        image={product.images[0]}
                    />
                ))}
            </div>


            {/* Scroll to top */}
            <button
                className="scroll-top"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                <img src={IconUp} />
            </button>
        </div>
    );
};

export default CategoryProducts;
