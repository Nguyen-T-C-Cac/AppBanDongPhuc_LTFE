import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/account.css";
import { accountData } from "../data/account";


function Account() {
    const navigate = useNavigate();

    const [user, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("info");
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


    const DEFAULT_AVATAR = "/images/avtAccount/avt.png";

    /* ================= INIT USER ================= */
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");

        // 👉 CHƯA ĐĂNG KÝ → DÙNG MOCK
        if (!storedUser || !storedUser.isLogin) {
            const mockUser = {
                username: accountData.user.name,
                email: accountData.user.email,
                avatar: accountData.user.avatar,
                address: accountData.address,
                contact: accountData.contact,
                payment: accountData.payment,
                isMock: true,
            };

            setUser(mockUser);
            setAddressForm({
                text: mockUser.address?.text || "",
            });

            setContactForm({
                phone: mockUser.contact.phone,
                email: mockUser.email,
            });
            setPaymentMethod(mockUser.payment);
            return;
        }

        setUser(storedUser);
        setAddressForm({
            text: storedUser.address?.text || "",
        });


        setContactForm({
            phone: storedUser.contact?.phone || "",
            email: storedUser.email || "",
        });
        setPaymentMethod(storedUser.payment || "bank");
    }, []);

    /* ================= AVATAR ================= */
    const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const updatedUser = { ...user, avatar: reader.result };
            setUser(updatedUser);

            if (!user.isMock) {
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }
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


                <div className="info">
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

                    {!isEditingAddress ? (
                        <p className="address-text">
                            {user.address?.text || "Chưa nhập địa chỉ"}
                        </p>
                    ) : (
                        <textarea className="address-input" value={addressForm.text}
                            onChange={(e) => setAddressForm({ text: e.target.value })}
                            placeholder="Enter your shipping address"
                        />
                    )}
                    <img
                        className="map-placeholder"
                        src={accountData.address.map}
                        alt="map"
                    />
                    <div className="section-header info">
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

            {/* PURCHASE HISTORY */}
            {activeTab === "history" && (
                <section className="purchase-history">
                    <p>Chưa có đơn hàng</p>
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
