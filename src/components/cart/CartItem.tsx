import React, {useState} from "react";
import '../../styles/cart.css'
import trash from "../../assets/icon/cart/fi-rr-trash.svg";
import {CartItem as CartItemType} from "../../types/CartType"
import {useDispatch} from "react-redux";
import {removeFromCart, updateSizeQuantity, updateLogoCustomization} from "../redux/Cart";

interface Props {
    item: CartItemType;
}

const CartItem: React.FC<Props> = ({item}) => {
    const dispatch = useDispatch();
    const [showLogoModal, setShowLogoModal] = useState(false);

    const totalQuantity = item.sizes.reduce(
        (sum, s) => sum + s.quantity,
        0
    );
    const [logoData, setLogoData] = useState({
        logoType: "No Logo",
        positions: [] as string[],
        width: "",
        height: "",
        notes: ""
    });

    return (
        <div className="cart-item">

            <div className="cart-main-info">
                <div className="cart-checkbox">
                    <input type="checkbox" className="cart-checkbox"/>
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
                        <span className="tag clickable" onClick={() => setShowLogoModal(true)}>{item.logoType || "Customize Logo >"}</span>
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
                                <label className="radio-box">
                                    <input type="radio" name="logoType" checked={logoData.logoType === "Printing"}
                                           onChange={() =>
                                               setLogoData(prev => ({ ...prev, logoType: "Printing" }))
                                           } />
                                    <span>No Logo</span>
                                </label>
                                <label className="radio-box">
                                    <input type="radio" name="logoType" />
                                    <span>Printing</span>
                                </label>
                                <label className="radio-box">
                                    <input type="radio" name="logoType" />
                                    <span>Embroidery</span>
                                </label>
                            </div>
                        </div>

                        {/* Position */}
                        <div className="logo-section">
                            <div className="section-label">Position</div>
                            <div className="logo-grid-2">
                                <label className="radio-box">
                                    <input type="checkbox" name="position" defaultChecked />
                                    <span>Left Chest</span>
                                </label>
                                <label className="radio-box">
                                    <input type="checkbox" name="position" />
                                    <span>Right Chest</span>
                                </label>
                                <label className="radio-box">
                                    <input type="checkbox" name="position" />
                                    <span>Back</span>
                                </label>
                                <label className="radio-box">
                                    <input type="checkbox" name="position" />
                                    <span>Sleeve</span>
                                </label>
                            </div>
                        </div>

                        {/* Size (cm) */}
                        <div className="logo-section">
                            <div className="section-label">Size (cm)</div>
                            <div className="logo-size-row">
                                <div className="size-input-group">
                                    <span>Width:</span>
                                    <input type="text" />
                                </div>
                                <div className="size-input-group">
                                    <span>Height:</span>
                                    <input type="text" />
                                </div>
                            </div>
                        </div>

                        {/* Upload */}
                        <div className="logo-section">
                            <div className="section-label">Upload</div>
                            <button className="upload-btn"
                                    //onClick={handleUploadClick}
                            >
                                <span>Upload Logo</span>
                            </button>
                            <input
                                type="file"
                                //ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                            />
                        </div>

                        {/* Notes */}
                        <div className="logo-section">
                            <div className="section-label">Notes</div>
                            <textarea placeholder="" className="logo-notes" value={logoData.notes}
                                      onChange={e => setLogoData({ ...logoData, notes: e.target.value })}/>
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