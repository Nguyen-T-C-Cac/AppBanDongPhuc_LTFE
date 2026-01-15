import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/account.css";
import { accountData } from "../data/account";
import { BankAccount  } from "../types/bank";
import defaultMap from "../assets/images/ImageHome/avarta/map2.png";
import {orderHistory} from "../data/orderHistory";
import {getCurrentUser, saveCurrentUser} from "../utils/accountUtil";
import { User, Address } from "../types/AccountType";
import defaultAvatar from "../assets/images/avtAccount/avt.png";

export const normalizeUser = (raw: any): User => {
    const addresses: Address[] = Array.isArray(raw.addresses)
        ? raw.addresses.map((addr: any) => ({
            id: addr.id,
            name: addr.name ?? "",
            text: addr.text ?? "",
            phone: addr.phone ?? "",
            map: addr.map ?? "",
        }))
        : [];

    return {
        id: raw.id ?? 0,
        username: raw.username ?? raw.user?.name ?? "",
        email: raw.email ?? raw.user?.email ?? "",
        avatar: raw.avatar ?? raw.user?.avatar ?? "/images/avt.png",

        activeAddress: addresses[0] ?? {
            id: 0,
            name: "",
            text: "",
            phone: "",
            map: "",
        },
        savedAddresses: addresses,
        contact: {
            phone: raw.contact?.phone ?? "",
            email: raw.contact?.email ?? raw.email ?? "",
        },
        payment: raw.payment ?? "bank",
        isLogin: raw.isLogin ?? true,
        isMock: raw.isMock ?? true,
    };
};

function Account() {
    const navigate = useNavigate();

    const [user, setUser] = useState<User| null>(null);

    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState("info");

    const [isEditingContact, setIsEditingContact] = useState(false);
    const [contactForm, setContactForm] = useState({
        phone: "",
        email: "",
    });
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [addressForm, setAddressForm] = useState({
        text: "",
    });

    const deliveredOrders = useMemo(() => {
        if (!user) return [];

        return orderHistory.filter(
            (order) =>
                order.product.idAccount === user.id &&
                order.status === "Delivered"
        );
    }, [user]);

    const [showBankForm, setShowBankForm] = useState(false);

    const [bankForm, setBankForm] = useState({
        bankName: "",
        branchName: "",
        accountNumber: "",
        accountHolder: "",
        isDefault: false,
    });
    const BANK_COLORS: Record<string, string> = {
        BIDV: "#20929e",        // xanh BIDV
        Vietcombank: "#16a34a", // xanh lá
        ACB: "#2563eb",         // xanh dương
        Techcombank: "#dc2626", // đỏ
        Agribank: "#9e3333",
        Vietinbank: "#3f77a5",
        MB: "#012dda",
        HDbank: "#605c52",
        VIB: "#193b60",
        VPbank: "#5e9855"
    };
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);

    const handleSaveBank = () => {
        if (!bankForm.bankName || !bankForm.accountNumber) return;

        setBankAccounts((prev) => {
            const shouldBeDefault =
                bankForm.isDefault || prev.length === 0;

            const updated = shouldBeDefault
                ? prev.map((b) => ({ ...b, isDefault: false }))
                : prev;

            return [
                ...updated,
                {
                    id: Date.now(),
                    bankName: bankForm.bankName,
                    branchName: bankForm.branchName,
                    accountNumber: bankForm.accountNumber,
                    accountHolder: bankForm.accountHolder,
                    isDefault: shouldBeDefault,
                },
            ];
        });
        setShowBankForm(false);
        setBankForm({
            bankName: "",
            branchName: "",
            accountNumber: "",
            accountHolder: "",
            isDefault: false,
        });
    };
    /* ================= INIT USER ================= */
    useEffect(() => {
        const currentUser = JSON.parse(
            localStorage.getItem("currentUser") || "null"
        );
        if (!currentUser || !currentUser.isLogin) {
            navigate("/login");
            return;
        }

        const currentAccountId = currentUser.id;

        const defaultUser =
            accountData.users.find(u => u.id === currentUser?.id)
            ?? accountData.users[0];
        const rawUser = currentUser.isMock
            ? {
                ...accountData,
                ...currentUser,
                addresses: currentUser?.addresses ?? defaultUser.addresses,
                contact: currentUser?.contact ?? defaultUser.contact,
            }
            : currentUser;

        const user = normalizeUser(rawUser);
        // Fill form
        setUser(user);
        //console.log("user.avatar =", user.avatar);

        setAddressForm({ text: user.activeAddress.text });
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
        if (!user) return;
        const updatedUser = {
            ...user,
            email: contactForm.email,
            contact: {
                ...user.contact,
                phone: contactForm.phone,
            },
        };

        setUser(updatedUser);

        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        setIsEditingContact(false);
    };

    const handleCancelEdit = () => {
        if (!user) return;
        setContactForm({
            phone: user.contact?.phone || "",
            email: user.email || "",
        });
        setIsEditingContact(false);
    };

    /* ================= LOGOUT ================= */
    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/login");
    };
    const handleSaveAddress = () => {
        if (!user) return;
        const updatedUser : User = {
            ...user,
            activeAddress: {
                ...user.activeAddress,
                text: addressForm.text
            }
        };

        setUser(updatedUser);
        saveCurrentUser(updatedUser);
        setIsEditingAddress(false);
    };

    const handleCancelAddress = () => {
        if (!user) return;
        setAddressForm({ text: user.activeAddress.text || "",});
        setIsEditingAddress(false);
    };

    if (!user) return null;

    return (
        <div className="account-page">
            {/* PROFILE */}
            <section className="account-profile">
                <div className="avatar-wrapper">
                    <img
                        className="avatar"
                        src={user.avatar && user.avatar.trim() !== "" ? user.avatar : defaultAvatar}
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
            {/* 3. SHIPPING ADDRESS */}
                    <div className="address-content-wrapper">
                        {!isEditingAddress ? (
                            <p className="address-text">
                                {user.activeAddress.text || "No address provided"}
                            </p>
                        ) : (
                            <textarea className="address-input" value={addressForm.text}
                                      onChange={(e) => setAddressForm({ text: e.target.value })}
                                      placeholder="Enter your shipping address"
                            />
                        )}
                        <img
                            className="map-placeholder"
                            src={
                                user.activeAddress.map && user.activeAddress.map.trim() !== ""
                                    ? user.activeAddress.map
                                    : defaultMap
                            }
                            alt="map"
                        />

                    </div>

            {/* 4. CONTACT INFO */}
            <div className="account-section">
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

                <div className="contact-fields">
                    <div className="field-group">
                        <label>Phone:</label>
                        <input
                            className="contact-input"
                            value={contactForm.phone}
                            readOnly={!isEditingContact}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        />
                    </div>
                    <div className="field-group">
                        <label>Email:</label>
                        <input
                            className="contact-input"
                            value={contactForm.email}
                            readOnly={!isEditingContact}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        />
                    </div>
                </div>
            </div>
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

                {paymentMethod === null && (
                    <p className="payment-empty">
                    </p>
                )}
                <label className="payment-option">
                    <input type="radio" name="payment"
                        checked={paymentMethod === "bank"}
                        onChange={() => setPaymentMethod("bank")}/>
                    <span className="custom-radio"></span>
                    <i className="fa fa-university payment-icon"></i>
                    <span className="payment-text">Bank Transfer</span>
                    {paymentMethod === "bank" && (
                        <button className="bank-add-btn"
                                onClick={() => setShowBankForm(true)}>add »
                        </button>
                    )}

                </label>
                {/* BIDV DETAIL – CHỈ HIỆN KHI CHỌN BANK */}
                {paymentMethod === "bank" && (
                    <div className="bank-detail">
                        <div className="bank-left">
                            <span className="bank-name">BIDV</span>
                            <span className="bank-number">937800****</span>
                        </div>
                    </div>
                )}
                {showBankForm && (
                    <div className="bank-form">
                        <h4>Add Bank Account</h4>

                        <div className="form-row">
                            <label>Bank Name</label>
                            <select
                                value={bankForm.bankName}
                                onChange={(e) =>
                                    setBankForm({ ...bankForm, bankName: e.target.value })
                                }
                            >
                                <option value="">Select bank</option>
                                <option value="BIDV">BIDV</option>
                                <option value="Vietcombank">Vietcombank</option>
                                <option value="Techcombank">Techcombank</option>
                                <option value="Agribank">Agribank</option>
                                <option value="Vietinbank">Vietinbank</option>
                                <option value="MB">MB</option>
                                <option value="HDbank">HDbank</option>
                                <option value="VIB">VIB</option>
                                <option value="VPbank">VPbank</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <label>Branch Name</label>
                            <input
                                type="text"
                                placeholder="Enter branch name"
                                value={bankForm.branchName}
                                onChange={(e) =>
                                    setBankForm({ ...bankForm, branchName: e.target.value })
                                }
                            />
                        </div>

                        <div className="form-row">
                            <label>Account Number</label>
                            <input
                                type="text"
                                placeholder="Enter account number"
                                value={bankForm.accountNumber}
                                onChange={(e) =>
                                    setBankForm({ ...bankForm, accountNumber: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-row toggle-row">
                            <span>Set as Default Account</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={bankForm.isDefault}
                                    onChange={(e) =>
                                        setBankForm({
                                            ...bankForm,
                                            isDefault: e.target.checked,
                                        })
                                    }
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="form-actions">
                            <button className="btn-cancel" onClick={() => setShowBankForm(false)}>
                                Cancel
                            </button>
                            <button className="btn-save" onClick={handleSaveBank}>
                                Save
                            </button>
                        </div>
                    </div>
                )}
                {paymentMethod === "bank" && (
                    <>
                        {bankAccounts.map((bank) => {
                            const color = BANK_COLORS[bank.bankName] || BANK_COLORS.default;

                            return (
                                <div
                                    key={bank.id}
                                    className="bank-detail"
                                    style={{ borderLeft: `4px solid ${color}` }}
                                >
                                    <div className="bank-left">
                        <span
                            className="bank-name"
                            style={{ color }}
                        >
                            {bank.bankName}
                            {bank.isDefault && (
                                <small className="default-tag"> Default</small>
                            )}
                        </span>

                                        <span className="bank-number">
                            {bank.accountNumber.replace(/\d(?=\d{4})/g, "*")}
                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}


                <label className="payment-option">
                    <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "online"}
                        onChange={() => setPaymentMethod("online")}
                    />
                    <span className="custom-radio"></span>
                    <i className="fa fa-credit-card payment-icon"></i>
                    <span className="payment-text">Online Payment</span>
                </label>

                <label className="payment-option">
                    <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                    />
                    <span className="custom-radio"></span>
                    <i className="fa fa-truck payment-icon"></i>
                    <span className="payment-text">Cash on Delivery</span>
                </label>
                <label className="payment-option">
                    <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "deposit"}
                        onChange={() => setPaymentMethod("deposit")}
                    />
                    <span className="custom-radio"></span>
                    <i className="fa fa-file-text-o payment-icon"></i>
                    <span className="payment-text">Deposit Payment</span>
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
