import React from "react";
import {useNavigate, useParams} from "react-router-dom";

import {categories} from '../../data/categories';
import IconNext from '../../assets/icon/products/fi-rr-angle-right.svg'

const SidebarCategory = () => {
    const navigate = useNavigate();
    const {category} = useParams();
    return (
        <div className="sidebar">
            <span className="sidebar-title">CATEGORIES</span>
            <hr/>
            {categories.map(cat => {
                const isActive =
                    category?.toLowerCase() === cat.name.toLowerCase();

                return (
                    <div
                        key={cat.id}
                        className={`sidebar-item ${isActive ? "active" : ""}`}
                        onClick={() => navigate(`/products/${cat.name}`)}
                    >
                        <span className="sidebar-name">{cat.name}</span>
                        <img src={IconNext} className="iconNext"/>
                    </div>
                );
            })}

        </div>
        )
    ;
};
export default SidebarCategory;