import React, {useState, useRef} from "react";
import '../../styles/cart.css'
import trash from "../../assets/icon/cart/fi-rr-trash.svg";
import {CartItem as CartItemType, LogoCustomization} from "../../types/CartType"
import {useDispatch} from "react-redux";
import {removeFromCart, updateSizeQuantity, updateLogoCustomization} from "../redux/Cart";

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

const CartItem: React.FC<Props> = ({item, isSelected, onToggleSelect}) => {
    const dispatch = useDispatch();
    const [showLogoModal, setShowLogoModal] = useState(false);
    const [logoData, setLogoData] = useState<LogoCustomization>(defaultLogoData);
    const totalQuantity = item.sizes.reduce(
        (sum, s) => sum + s.quantity,
        0
    );

    const handleOpenModal = () => {
        if (!item.logoType) {
            // Trường hợp chưa có dữ liệu -> Reset về mặc định
            setLogoData(defaultLogoData);
        } else if (typeof item.logoType === 'string') {
            setLogoData({
                ...defaultLogoData,
                logoType: item.logoType === "No logo" ? "No Logo" : item.logoType
            });
        } else {
            // Trường hợp là Object
            setLogoData(item.logoType);
        }
        setShowLogoModal(true);
    };
    // Xử lý chọn Position
    const handlePositionChange = (pos: string) => {
        setLogoData(prev => {
            const exists = prev.positions.includes(pos);
            if (exists) {
                // Nếu đã có -> Xóa đi
                return { ...prev, positions: prev.positions.filter(p => p !== pos) };
            } else {
                // Nếu chưa có -> Thêm vào
                return { ...prev, positions: [...prev.positions, pos] };
            }
        });
    };
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setLogoData(prev => ({
                ...prev,
                image: reader.result as string
            }));
        };
        reader.readAsDataURL(file);
    };

    // Hiển thị tên Logo ra màn hình chính
    const getDisplayLogoName = () => {
        if (!item.logoType) return "No Logo";
        if (typeof item.logoType === 'string') return item.logoType;

        return item.logoType.logoType;
    };
    return (
        <div className="cart-item">

            <div className="cart-main-info">
                <div className="cart-checkbox">
                    <input type="checkbox" className="cart-checkbox"
                           checked={isSelected}
                           onChange={onToggleSelect}/>
                </div>

                <img src={item.image} className="cart-img" alt={item.name}/>

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

                        <span className="tag clickable" onClick={handleOpenModal}>
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

            {/* LOGO CUSTOMIZATION MODAL */}
            {showLogoModal && (
                <div className="logo-modal-overlay" onClick={() => setShowLogoModal(false)}>
                    <div className="logo-modal" onClick={(e) => e.stopPropagation()}>
                        <h3 className="logo-modal-title">LOGO CUSTOMIZATION</h3>

                        {/* Logo Type */}
                        <div className="logo-section">
                            <div className="section-label">Logo type</div>
                            <div className="logo-grid-3">
                                {["No Logo", "Printing", "Embroidery"].map((type) => (
                                    <label key={type} className="radio-box">
                                        <input
                                            type="radio"
                                            name="logoType"
                                            checked={logoData.logoType === type}
                                            onChange={() => setLogoData({...logoData, logoType: type})}
                                        />
                                        <span>{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Position */}
                        <div className="logo-section">
                            <div className="section-label">Position</div>
                            <div className="logo-grid-2">
                                {["Left Chest", "Right Chest", "Back", "Sleeve"].map((pos) => (
                                    <label key={pos} className="radio-box">
                                        <input
                                            type="checkbox"
                                            checked={logoData.positions.includes(pos)}
                                            onChange={() => handlePositionChange(pos)}
                                        />
                                        <span>{pos}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Size (cm) */}
                        <div className="logo-section">
                            <div className="section-label">Size (cm)</div>
                            <div className="logo-size-row">
                                <div className="size-input-group">
                                    <span>Width:</span>
                                    <input
                                        type="text"
                                        value={logoData.width}
                                        onChange={(e) => setLogoData({...logoData, width: e.target.value})}
                                    />
                                </div>
                                <div className="size-input-group">
                                    <span>Height:</span>
                                    <input
                                        type="text"
                                        value={logoData.height}
                                        onChange={(e) => setLogoData({...logoData, height: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Upload */}
                        <div className="logo-section">
                            <div className="section-label">Upload</div>
                            <div className="upload-row">
                                <button className="upload-btn" type="button"
                                        onClick={handleUploadClick}
                                ><span>Upload Logo</span>
                                </button>

                                {logoData.image && (
                                    <div className="logo-preview">
                                        <img src={logoData.image} alt="logo preview"/>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{display: "none"}}
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                            <div className="logo-section">
                                <div className="section-label">Notes</div>
                                <textarea
                                    className="logo-notes"
                                    value={logoData.notes}
                                    onChange={e => setLogoData({...logoData, notes: e.target.value})}
                                />
                            </div>

                            {/* Footer Buttons */}
                            <div className="logo-actions">
                                <button className="cancel-btn" onClick={() => setShowLogoModal(false)}>
                                    Cancel
                                </button>
                                <button className="save-btn" onClick={() => {
                                    dispatch(updateLogoCustomization({
                                        id: item.id,
                                        logoCustomization: logoData
                                    }));
                                    setShowLogoModal(false);
                                }}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                    )}

                </div>

            );
            }

            export default CartItem;