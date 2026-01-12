import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/account.css";
import { accountData } from "../data/account";
import {User} from "../types/Account";
import defaultMap from "../assets/images/ImageHome/avarta/map2.png";
import {orderHistory} from "../data/orderHistory";
export const normalizeUser = (raw: any): User => ({
    username: raw.username ?? raw.user?.name ?? "",
    email: raw.email ?? raw.user?.email ?? "",
    avatar: raw.avatar ?? raw.user?.avatar ?? "/images/avt.png",

    address: {
        text: raw.address?.text ?? "",
        map:
            raw.address?.map &&
            raw.address.map.trim() !== ""
                ? raw.address.map
                : defaultMap,
    },

    contact: {
        phone: raw.contact?.phone ?? "",
    },

    payment: raw.payment ?? "bank",
    isLogin: raw.isLogin ?? true,
});
function Account() {
    const navigate = useNavigate();
    const mainAddress = accountData.addresses?.[0];
    const user= accountData.user;

    const [user, setUser] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState("bank");

    const [isEditingContact, setIsEditingContact] = useState(false);
    const [contactForm, setContactForm] = useState({
        phone: "",
        email: "",
    });
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [addressForm, setAddressForm] = useState({
        text: "",
    });
    const DEFAULT_MAP = "/images/ImageHome/avarta/map2.png"
    const DEFAULT_AVATAR = "/images/avtAccount/avt.png";
    const [activeTab, setActiveTab] = useState("info");
    const deliveredOrders = orderHistory.filter((orderHistory: { status: string; }) => orderHistory.status === "Delivered");

    /* ================= INIT USER ================= */
    useEffect(() => {
        const storedUser = JSON.parse(
            localStorage.getItem("currentUser") || "null"
        );

        if (!storedUser || !storedUser.isLogin) {
            navigate("/login");
            return;
        }
        const defaultUser =
            accountData.users.find(u => u.id === storedUser?.id)
            ?? accountData.users[0];
        const rawUser = storedUser.isMock
            ? {

                ...accountData,
                ...storedUser,
                address: storedUser?.address ?? defaultUser.address,
                contact: storedUser?.contact ?? defaultUser.contact,
            }
            : storedUser;

        const user = normalizeUser(rawUser);

        setUser(user);
        setAddressForm({ text: user.address.text });
        setContactForm({
            phone: user.contact.phone,
            email: user.email,
        });
        setPaymentMethod(user.payment);
    }, []);
    /* ================= AVATAR ================= */
    const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setUser((prev: any) => ({
                ...prev,
                avatar: reader.result, // chỉ dùng để render
            }));
        };

        reader.readAsDataURL(file);
    };

    /* ================= CONTACT EDIT ================= */
    const handleSaveContact = () => {
        const updatedUser = {
            ...user,
            email: contactForm.email,
            contact: {
                ...user.contact,
                phone: contactForm.phone,
            },
        };

        setUser(updatedUser);

        if (!user.isMock) {
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }

        setIsEditingContact(false);
    };

    const handleCancelEdit = () => {
        setContactForm({
            phone: user.contact?.phone || "",
            email: user.email || "",
        });
        setIsEditingContact(false);
    };

    /* ================= LOGOUT ================= */
    const handleLogout = () => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        if (storedUser) {
            localStorage.setItem(
                "user",
                JSON.stringify({ ...storedUser, isLogin: false })
            );
        }
        navigate("/login");
    };
    const handleSaveAddress = () => {
        const updatedUser = {
            ...user,
            address: {
                ...user.address,
                text: addressForm.text,
            },
        };

        setUser(updatedUser);

        if (!user.isMock) {
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }

        setIsEditingAddress(false);
    };

    const handleCancelAddress = () => {
        setAddressForm({
            text: user.address?.text || "",
        });
        setIsEditingAddress(false);
    };

    if (!user) return null;

    return (
        <div className="account-page">
            {/* PROFILE */}
            <section className="account-profile">
                <div className="avatar-wrapper">
                    <img className="avatar"
                         src={user.avatar && user.avatar.trim() !== "" ? user.avatar : DEFAULT_AVATAR}
                         alt="avatar"
                    />

                    <input type="file" accept="image/*" id="avatarInput" style={{ display: "none" }} onChange={handleChangeAvatar}/>
                    <button className="change-avatar-btn" onClick={() => document.getElementById("avatarInput")?.click()}>
                        Change avatar
                    </button>
                </div>


                <div className="info-account">
                    <h3>{user.username}</h3>
                    <p>{user.email}</p>
                    <button className="logout-btn" onClick={handleLogout}>Log out</button>
                </div>
            </section>
            {/* TABS */}
            <section className="account-tabs">
                <span className={`tab ${activeTab === "info" ? "active" : ""}`}
                      onClick={() => setActiveTab("info")}>Information
                </span>
                <span className={`tab ${activeTab === "history" ? "active" : ""}`}
                      onClick={() => setActiveTab("history")}>Purchase History
        </span>
            </section>

<<<<<<< HEAD
            {/* ACCOUNT INFO */}
            {activeTab === "info" && (
                <section className="account-section">
                    <div className="section-header address">
                        <h4>Shipping Address</h4>
                        {!isEditingAddress ? (
                            <button onClick={() => setIsEditingAddress(true)}>Edit</button>
                        ) : (
                            <div className="edit-actions">
                                <button className="save-btn" onClick={handleSaveAddress}>Save</button>
                                <button className="cancel-btn" onClick={handleCancelAddress}>Cancel</button>
                            </div>
                        )}

                    </div>
=======
            {/* 3. SHIPPING ADDRESS */}
            <section className="account-section">
                <div className="section-header">
                    <h4>Shipping Address</h4>
                    <button>Edit</button>
                </div>
                    {mainAddress ? (
                        <>
                            <p className="address-name"><b>{mainAddress.name}</b></p>
                            <p className="address-text">{mainAddress.text}</p>
                            <p className="address-phone">{mainAddress.phone}</p>
                        </>
                    ) : (
                        <p className="address-text">No address yet</p>
                    )}
                <img
                    className="map-placeholder"
                    alt="map"
                />
            </section>

            {/* 4. CONTACT INFO */}
            <section className="account-section">
                <div className="section-header">
                    <h4>Contact Information</h4>
                    <button>Edit</button>
                </div>
                {mainAddress ? (
                        <>
                            <p className="address-email"><b>{user.email}</b></p>
                            <p className="address-phone">{mainAddress.phone}</p>
                        </>
                ) : (
                    <p className="address-text">No Information</p>
                )}
                {/* <input value={accountData.contact.email} readOnly />
                <input value={accountData.contact.phone} readOnly />*/}
            </section>
>>>>>>> caca

                    {!isEditingAddress ? (
                        <p className="address-text">
                            {user.address.text || "No address provided"}
                        </p>
                    ) : (
                        <textarea className="address-input" value={addressForm.text}
                                  onChange={(e) => setAddressForm({ text: e.target.value })}
                                  placeholder="Enter your shipping address"
                        />
                    )}
                    <img className="map-placeholder" src={user.address.map} />

                    <div className="section-header">
                        <h4>Contact Information</h4>
                        {!isEditingContact ? (
                            <button onClick={() => setIsEditingContact(true)}>Edit</button>
                        ) : (
                            <div className="edit-actions">
                                <button className="save-btn" onClick={handleSaveContact}>Save</button>
                                <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        )}
                    </div>
                    <input className="contact-input" value={contactForm.phone} readOnly={!isEditingContact}
                           onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}/>
                    <input className="contact-input" value={contactForm.email} readOnly={!isEditingContact}
                           onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}/>
                </section>
            )}

            {/* 4. PURCHASE HISTORY */}
            {activeTab === "history" && (
                <section className="purchase-history">
                    {deliveredOrders.length === 0 ? (
                        <p>Không có đơn hàng đã giao</p>
                    ) : (
                        deliveredOrders.map((order) => (
                            <div className="order-card" key={order.id}>
                                <div className="order-header">
                                    <img
                                        src={order.product.images[0]}
                                        alt={order.product.name}
                                        className="order-image"
                                    />
                                    <div className="order-info">

                                        <h5>{order.product.name}</h5>
                                        <p className="order-price">{order.product.price.toLocaleString()} VND</p>
                                        <p className="order-date">Order date: {order.orderDate || "14 Sep 2025"}</p>
                                    </div>
                                </div>

                                <div className="order-details">
                                    <div className="order-detail-item">
                                        <span className="detail-label">Size</span>
                                        <div className="detail-value">
                                            {order.items.map((item, index) => (
                                                <p key={index}>{item.size}</p>))}
                                        </div>

                                    </div>
                                    <div className="order-detail-item">
                                        <span className="detail-label">Quantity</span>
                                        <div className="detail-value">
                                            {order.items.map((item, index) => (
                                                <p key={index}>{item.quantity}</p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="order-detail-item">
                                        <span className="detail-label">Gender</span>
                                        <div className="detail-value">
                                            {order.items.map((item, index) => (
                                                <p key={index}>{item.gender}</p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="order-detail-item">
                                        <span className="detail-label">Logo type</span>
                                        <div className="detail-value logo">
                                            {order.logo ? "Custom logo" : "No logo"}
                                        </div>
                                    </div>
                                    <div className={"order-detail-price"}>
                                        <span className="left">Total quantity: {order.quantity || 1}</span>
                                        <span className="right">Total: <strong>{((order.quantity || 1) * order.product.price).toLocaleString()} VND</strong></span>
                                    </div>
                                </div>

                                <div className="order-footer">
                                    <div className="order-actions">
                                        <button className="btn-outline">Trả hàng / hoàn tiền</button>
                                        <button className="btn-primary">Đánh giá</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </section>
            )}
            {/* PAYMENT METHODS */}
            <section className="account-section">
                <h4>Payment Methods</h4>
                <label>
                    <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "bank"}
                        onChange={() => setPaymentMethod("bank")}
                    />
                    <span className="payment-text">Bank Transfer (BIDV)</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "online"}
                        onChange={() => setPaymentMethod("online")}
                    />
                    <span className="payment-text">Online Payment</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                    />
                    <span className="payment-text">Cash on Delivery</span>
                </label>
            </section>


            {/* CONTACT SUPPORT */}
            <section className="account-support">
                <h4>Contact us</h4>
                <p>
                    <i className="fa fa-envelope" style={{ marginRight: "6px" }}></i>
                    Email: support@domain.com
                </p>
                <p>
                    <i className="fa fa-phone" style={{ marginRight: "6px" }}></i>
                    Hotline: 0777777777
                </p>
                <p>
                    <i className="fa fa-clock-o" style={{ marginRight: "6px" }}></i>
                    Support Hours: 8:30 – 18:00 (Mon–Fri)
                </p>
                <button>
                    <i className="fa fa-comment" style={{ marginRight: "6px" }}></i>
                    Chat Now
                </button>
            </section>

        </div>

    );
}

export default Account;