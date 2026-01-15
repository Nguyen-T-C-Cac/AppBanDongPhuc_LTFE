import React, { useState } from "react";
import "../../styles/cart.css";
import trash from "../../assets/icon/cart/fi-rr-trash.svg";
import { CartItem as CartItemType, LogoCustomization } from "../../types/CartType";
import { useDispatch } from "react-redux";
import {
    removeFromCart,
    updateSizeQuantity,
    updateLogoCustomization
} from "../redux/Cart";
import LogoCustomizationModal from "./LogoCustomizationModal";

interface Props {
    item: CartItemType;
    userId: number;
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

const CartItem: React.FC<Props> = ({ item, userId, isSelected, onToggleSelect }) => {
    const dispatch = useDispatch();
    const [showLogoModal, setShowLogoModal] = useState(false);

    const totalQuantity = item.sizes.reduce(
        (sum, s) => sum + s.quantity,
        0
    );

    const getInitialLogoData = (): LogoCustomization => {
        if (!item.logoType) return defaultLogoData;
        if (typeof item.logoType === "string") {
            return {
                ...defaultLogoData,
                logoType: item.logoType === "No logo" ? "No Logo" : item.logoType
            };
        }
        return item.logoType;
    };

    const getDisplayLogoName = () => {
        if (!item.logoType) return "No Logo";
        if (typeof item.logoType === "string") return item.logoType;
        return item.logoType.logoType;
    };

    const handleSaveLogo = (newLogoData: LogoCustomization) => {
        dispatch(updateLogoCustomization({
            userId,
            cartItemId: item.id,
            logoCustomization: newLogoData
        }));
        setShowLogoModal(false);
    };

    return (
        <div className="cart-item">
            <div className="cart-main-info">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={onToggleSelect}
                />

                <img src={item.image} className="cart-img" alt={item.name} />

                <div className="cart-content">
                    <div className="cart-top-row">
                        <div className="cart-title">{item.name}</div>
                        <img
                            src={trash}
                            className="delete-icon"
                            alt="delete"
                            onClick={() =>
                                dispatch(removeFromCart({
                                    userId,
                                    cartItemId: item.id
                                }))
                            }
                        />
                    </div>

                    <div className="cart-price">
                        {item.price.toLocaleString()} VND
                    </div>

                    <div className="cart-attributes">
                        <span className="tag">{item.gender}</span>

                        <span
                            className="tag clickable"
                            onClick={() => setShowLogoModal(true)}
                        >
                            {getDisplayLogoName()}
                        </span>
                    </div>
                </div>
            </div>

            <div className="cart-sizes-list">
                {item.sizes.map((s) => (
                    <div key={s.size} className="cart-size-row">
                        <span>Size: <b>{s.size}</b></span>

                        <div className="quantity-control">
                            <button
                                onClick={() =>
                                    dispatch(updateSizeQuantity({
                                        userId,
                                        cartItemId: item.id,
                                        size: s.size,
                                        delta: -1
                                    }))
                                }
                            >
                                -
                            </button>

                            <span>{s.quantity}</span>

                            <button
                                onClick={() =>
                                    dispatch(updateSizeQuantity({
                                        userId,
                                        cartItemId: item.id,
                                        size: s.size,
                                        delta: 1
                                    }))
                                }
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-footer">
                Total Quantity: <b>{totalQuantity}</b>
            </div>

            <LogoCustomizationModal
                isOpen={showLogoModal}
                onClose={() => setShowLogoModal(false)}
                onSave={handleSaveLogo}
                initialData={getInitialLogoData()}
            />
        </div>
    );
};

export default CartItem;
