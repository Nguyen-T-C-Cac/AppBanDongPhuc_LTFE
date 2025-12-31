import React from 'react';
import { useNavigate } from "react-router-dom";
import { categories } from '../../data/categories';
import img_shool from '../../assets/icon/products/school.png'
import img_company from '../../assets/icon/products/company.png'
import img_sport from '../../assets/icon/products/sport.png'
import img_factory from '../../assets/icon/products/factory.png'
import img_service from '../../assets/icon/products/service.png'
import img_event from '../../assets/icon/products/event.png'

const imgcategories: Record<number, string> = {
    1: img_shool,
    2: img_company,
    3: img_sport,
    4: img_factory,
    5: img_service,
    6: img_event
};
const CategoryCard = () => {
    const navigate = useNavigate();
    return (
        <div className="category-card">
            {categories.map(cat => (
                <div key={cat.id} className="category-item"
                     onClick={() => navigate(`/products/${cat.name}`)}
                     style={{ cursor: "pointer" }}>
                    <div className="category-icon">
                        <img src={imgcategories[cat.id]} alt={cat.name}/>
                    </div>
                    <span className="category-name">{cat.name}</span>
                </div>
            ))}
        </div>
    );
};

export default CategoryCard;

