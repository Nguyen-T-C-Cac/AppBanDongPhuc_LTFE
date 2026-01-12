import React, { useState } from "react";
import '../../styles/cart.css'
import trash from "../../assets/icon/cart/fi-rr-trash.svg";
import { CartItem as CartItemType, LogoCustomization } from "../../types/CartType"
import { useDispatch } from "react-redux";
import { removeFromCart, updateSizeQuantity, updateLogoCustomization } from "../redux/Cart";
import LogoCustomizationModal from "./LogoCustomizationModal";

interface Props {
    item: CartItemType;
    isSelected: boolean;
    onToggleSelect: () => void;
}

const defaultLogoData: LogoCustomization = {
    logoType: "No Logo",
    positions: [],
    width: "",
    height: "",
    notes: ""
};

const CartItem: React.FC<Props> = ({ item, isSelected, onToggleSelect }) => {
    const dispatch = useDispatch();
    const [showLogoModal, setShowLogoModal] = useState(false);

    const totalQuantity = item.sizes.reduce(
        (sum, s) => sum + s.quantity,
        0
    );

    // Chuẩn bị dữ liệu
    const getInitialLogoData = (): LogoCustomization => {
        if (!item.logoType) {
            return defaultLogoData;
        } else if (typeof item.logoType === 'string') {
            return {
                ...defaultLogoData,
                logoType: item.logoType === "No logo" ? "No Logo" : item.logoType
            };
        } else {
            return item.logoType;
        }
    };

    // Hiển thị tên Logo ra màn hình chính
    const getDisplayLogoName = () => {
        if (!item.logoType) return "No Logo";
        if (typeof item.logoType === 'string') return item.logoType;
        return item.logoType.logoType;
    };

    // Lưu dữ liệu từ Modal
    const handleSaveLogo = (newLogoData: LogoCustomization) => {
        dispatch(updateLogoCustomization({
            id: item.id,
            logoCustomization: newLogoData
        }));
        setShowLogoModal(false);
    };

    return (
        <div className="cart-item">
            <div className="cart-main-info">
                <div className="cart-checkbox">
                    <input type="checkbox" className="cart-checkbox"
                           checked={isSelected}
                           onChange={onToggleSelect} />
                </div>

                <img src={item.image} className="cart-img" alt={item.name} />

                <div className="cart-content">
                    <div className="cart-top-row">
                        <div className="cart-title">{item.name}</div>
                        <img
                            src={trash}
                            className="delete-icon"
                            onClick={() => dispatch(removeFromCart(item.id))}
                            alt="delete"
                        />
                    </div>
                    <div className="cart-price">{item.price.toLocaleString()} VND</div>

                    <div className="cart-attributes">
                        <span className="tag">{item.gender}</span>

                        <span className="tag clickable" onClick={() => setShowLogoModal(true)}>
                            {getDisplayLogoName() || "Customize Logo >"}
                        </span>

                        {typeof item.logoType === "object" && item.logoType.image && (
                            <img
                                src={item.logoType.image}
                                className="mini-logo-thumb"
                                alt="logo"
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="separator"></div>

            {/* Danh sách Size và Số lượng */}
            <div className="cart-sizes-list">
                {item.sizes.map((s) => (
                    <div key={s.size} className="cart-size-row">
                        <div className="size-label">
                            Size: <b>{s.size}</b>
                        </div>

                        <div className="quantity-control">
                            <button onClick={() =>
                                dispatch(updateSizeQuantity({
                                    id: item.id,
                                    size: s.size,
                                    delta: -1
                                }))
                            }>-</button>
                            <span>{s.quantity}</span>
                            <button onClick={() =>
                                dispatch(updateSizeQuantity({
                                    id: item.id,
                                    size: s.size,
                                    delta: 1
                                }))
                            }>+</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-footer">
                Total Quantity: <b>{totalQuantity}</b>
            </div>

            {/* Sử dụng Component Modal */}
            <LogoCustomizationModal
                isOpen={showLogoModal}
                onClose={() => setShowLogoModal(false)}
                onSave={handleSaveLogo}
                initialData={getInitialLogoData()}
            />
        </div>
    );
}

export default CartItem;