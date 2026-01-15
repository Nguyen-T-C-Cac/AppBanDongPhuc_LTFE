import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartItem, LogoCustomization } from "../types/CartType";
import {removeFromCart} from "../components/redux/Cart";
import Navbar from "../components/common/Navbar";
import '../styles/checkout.css';
import PageHeader from "../components/common/PageHeader";
import { accountData } from "../data/account";
import { User, Address } from "../types/AccountType";
import { getCurrentUser } from "../utils/accountUtil";
import {shippingOptions} from "../data/shipping";
import iconTransfer from "../assets/icon/checkout/transfer.svg"
import iconCash from "../assets/icon/checkout/cash.svg"
import iconDeposit from "../assets/icon/checkout/deposit.svg"
import iconOnlPayment from "../assets/icon/checkout/onlPayment.svg"
import BankAccountSelector, { BankAccount } from "../components/payment/BankAccountSelector";
import PaymentQRModal from "../components/payment/PaymentQRModal";
import LogoDetails from "../components/payment/LogoDetails";
import {Order, saveOrder} from "../utils/orderUtil";
import {useDispatch} from "react-redux";

interface CheckoutLocationState {
    items: CartItem[];
    totalPrice?: number;
}

const Checkout = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const checkoutState = location.state as CheckoutLocationState | null;
    const navigate = useNavigate();
    const checkoutItems: CartItem[] = location.state?.items || [];

    const totalPrice = checkoutState?.totalPrice ?? 0;
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    //const [paymentMethod, setPaymentMethod] = useState(accountData.payment || "bank");
    const [paymentMethod, setPaymentMethod] = useState<
        "bank" | "deposit" | "online" | "cod"
    >("cod");

    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);

    // Lấy dữ liệu được gửi từ trang Cart
    const [showAddressModal, setShowAddressModal] = useState(false);
    //const [selectedAddress, setSelectedAddress] = useState(accountData.addresses[0]);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [showShippingModal, setShowShippingModal] = useState(false);

    const [shippingOption, setShippingOption] = useState<"standard" | "fast">("standard");
    const [showQRModal, setShowQRModal] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const user = getCurrentUser();
        if (!user) {
            navigate("/login");
            return;
        }
        setCurrentUser(user);

        if (user.activeAddress?.text?.trim()) {
            setSelectedAddress(user.activeAddress);
        } else if (user.savedAddresses.some(a => a.text?.trim())) {
            setSelectedAddress(user.savedAddresses.find(a => a.text.trim())!);
        } else {
            setSelectedAddress(null);
        }
        if(user.payment) {
            setPaymentMethod(user.payment);
        }
    }, [navigate, location.key]);

    // Tính lại tổng tiền
    const Subtotal = checkoutItems.reduce((total, item) => {
        const itemQuantity = item.sizes.reduce((sum, s) => sum + s.quantity, 0);
        return total + (item.price * itemQuantity);
    }, 0);

    const shippingFee = shippingOptions[shippingOption].fee;
    const totalPayment = Subtotal + shippingFee;
    // Tính ngày vận chuyển
    const calculateEstimatedArrival = () => {
        const today = new Date();
        const maxDays = shippingOptions[shippingOption].maxDays;

        const arrivalDate = new Date(today);
        arrivalDate.setDate(today.getDate() + maxDays +10); //cộng thêm 10 ngày sản xuất hàng

        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return arrivalDate.toLocaleDateString("en-US", options);
    };

    //hiển thị tên Logo
    const getDisplayLogoName = (logoType: any) => {
        if (!logoType) return "No Logo";
        if (typeof logoType === 'string') return logoType;
        return logoType.logoType;
    };
    const createOrderData = (): Order => {
        const orderId = `#ORD-${Date.now().toString().slice(-6)}`; // Tạo ID ngẫu nhiên dựa trên thời gian
        let initialStatus = "Pending Payment"; // Mặc định cho bank, deposit, online

        if (paymentMethod === "cod") {
            initialStatus = "Confirmed"; // Chỉ COD là được Confirmed ngay
        }
        return {
            id: orderId,
            userId: currentUser ? currentUser.id : 0,
            date: new Date().toLocaleDateString("vi-VN",{timeZone: "Asia/Ho_Chi_Minh"}),
            items: checkoutItems,
            total: totalPayment,
            shippingFee: shippingFee,
            shippingOption: shippingOptions[shippingOption].label,
            paymentMethod: paymentMethod,
            status: initialStatus,
            address: selectedAddress!, // Dấu ! vì đã check null ở handlePlaceOrder
            estimatedArrival: calculateEstimatedArrival()
        };
    };
    const handlePlaceOrder = () => {
        if (!selectedAddress || !selectedAddress.text?.trim()) {
            alert("Please select or add a shipping address before placing order.");
            setShowAddressModal(true);
            return;
        }

        if (paymentMethod === "bank") {
            setShowQRModal(true);
        } else {
            finishOrderProcess();
        }
    };

    const finishOrderProcess = () => {
        const newOrder = createOrderData();

        saveOrder(newOrder);

        // Xóa giỏ hàng
        if (currentUser) {
            checkoutItems.forEach(item => {
                dispatch(removeFromCart({
                    userId: currentUser.id,
                    cartItemId: item.id
                }));
            });
        }
        navigate("/order-success", { state: { order: newOrder } });
    };
    // Nếu không có sản phẩm nào
    if (checkoutItems.length === 0) {
        return (
            <div style={{ padding: 20, textAlign: 'center' }}>
                <h2>Chưa có đơn hàng nào</h2>
                <button onClick={() => navigate('/cart')}>Quay lại giỏ hàng</button>
            </div>
        );
    }
    if (!currentUser) return <div>Loading...</div>;
    return (
        <div className="checkout-page">
            <PageHeader title="Checkout"/>

            <div className="checkout-card shipping-card">
                <div className="shipping-header">
                    <span>Shipping Address</span>
                    <button className="btn-change" onClick={() => setShowAddressModal(true)}>Change Address</button>
                </div>
                <div className="shipping-body">
                    {selectedAddress ? (
                        <>
                            <p className="shipping-name">
                                {selectedAddress.name}
                                {selectedAddress.phone && <span> ({selectedAddress.phone})</span>}
                            </p>
                            <p className="shipping-address">{selectedAddress.text}</p>
                        </>
                    ) : (
                        <p className="shipping-empty">
                            No shipping address yet. Please add one.
                        </p>
                    )}
                </div>

            </div>

            {checkoutItems.map(item => {
                const totalQty = item.sizes.reduce((s, i) => s + i.quantity, 0);
                return (
                    <div key={item.id} className="checkout-card item-card">
                        <div className="item-title">
                            {item.name} <span>/{item.price.toLocaleString()} VND</span>
                        </div>

                        <div className="item-body">
                            <img src={item.image} alt={item.name}/>

                            <div className="item-info">
                                <div className="size-table">
                                    <div className="table-header">
                                        <span>Size</span>
                                        <span>Quantity</span>
                                        <span>Gender</span>
                                        <span>Logo type</span>
                                    </div>

                                    {item.sizes.map(s => (
                                        <div key={s.size} className="table-row">
                                            <span>{s.size}</span>
                                            <span>{s.quantity}</span>
                                            <span>{item.gender}</span>
                                            <span>{getDisplayLogoName(item.logoType)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="total-qty">Total Quantity: {totalQty}</div>
                            </div>
                        </div>
                        <LogoDetails logoData={item.logoType} />
                    </div>
                );
            })}

            {/* ESTIMATED DELIVERY */}
            <div className="checkout-card delivery-card">
                <div className="delivery-left">
                    <b>Estimated Delivery Time</b>
                    <p>Production: 7–10 days</p>
                    <p>Shipping: {shippingOptions.standard.time}</p>
                    <p className="arrival">Estimated Arrival: {calculateEstimatedArrival()}</p>
                </div>

                <div className="delivery-right">
                    <button className="shipping-option-btn"
                            onClick={() => setShowShippingModal(true)}>
                        Shipping options &gt;
                        <span>{shippingOptions[shippingOption].label}</span>
                    </button>
                    <div className="shipping-fee">
                        Shipping Fee: {shippingFee.toLocaleString()} VND
                    </div>
                </div>
            </div>

            {/* PAYMENT METHODS */}
            <div className="checkout-card payment-method-card">
                <b>Payment Methods</b>

                <label className="payment-row">
                    <img src={iconTransfer}/>
                    <span>Bank Transfer</span>
                    <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "bank"}
                        onChange={() => setPaymentMethod("bank")}
                    />
                </label>

                <label className="payment-row">
                    <img src={iconDeposit}/>
                    <span>Deposit Payment (50%)</span>
                    <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "deposit"}
                        onChange={() => setPaymentMethod("deposit")}
                    />
                </label>

                <label className="payment-row">
                    <img src={iconOnlPayment}/>
                    <span>Online Payment</span>
                    <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "online"}
                        onChange={() => setPaymentMethod("online")}
                    />
                </label>

                <label className="payment-row">
                    <img src={iconCash}/>
                    <span>Cash on Delivery</span>
                    <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                    />
                </label>
            </div>
            <div className="checkout-card payment-extra-card">
                <b>Payment Information</b>

                {/* BANK TRANSFER */}
                {paymentMethod === "bank" && (
                    <BankAccountSelector
                        accounts={bankAccounts}
                        onAdd={(newAcc: BankAccount) =>
                            setBankAccounts(prev => [...prev, newAcc])
                        }
                    />
                )}


                {/* DEPOSIT 50% */}
                {paymentMethod === "deposit" && (
                    <div className="deposit-info">
                        <p>
                            You need to pay <b>50% of total order value</b> in advance.
                        </p>

                        <div className="row">
                            <span>Deposit Amount (50%) </span>
                            <span>
                    {(totalPayment * 0.5).toLocaleString()} VND
                </span>
                        </div>

                        <p className="note">
                            Remaining 50% will be paid upon delivery.
                        </p>
                    </div>
                )}

                {/* ONLINE PAYMENT */}
                {paymentMethod === "online" && (
                    <div className="online-info">
                        <p>Choose Online Payment Gateway</p>

                        <div className="online-methods">
                            <button>VNPay</button>
                            <button>MoMo</button>
                            <button>ZaloPay</button>
                        </div>

                        <p className="note">
                            You will be redirected to payment gateway.
                        </p>
                    </div>
                )}

                {/* COD */}
                {paymentMethod === "cod" && (
                    <div className="cod-info">
                        <p>You will pay when receiving the goods.</p>
                        <p className="note">
                            Please prepare exact amount for the courier.
                        </p>
                    </div>
                )}
            </div>

            {/* PAYMENT DETAILS */}
            <div className="checkout-card payment-detail-card">
                <b>Payment Details</b>

                <div className="row">
                    <span>Merchandise Subtotal</span>
                    <span>{Subtotal.toLocaleString()} VND</span>
                </div>
                <div className="row">
                    <span>Shipping Subtotal</span>
                    <span>{shippingFee.toLocaleString()} VND</span>
                </div>
                <div className="row total">
                    <span>Total Payment</span>
                    <span>{totalPayment.toLocaleString()} VND</span>
                </div>
            </div>
            {/* FOOTER */}
            <div className="checkout-footer">
                <button className="placeOrderBtn" onClick={handlePlaceOrder}>Place Order</button>
            </div>
            <PaymentQRModal
                isOpen={showQRModal}
                onClose={() => {setShowQRModal(false);
                    finishOrderProcess();}}

                totalAmount={totalPayment}
            />
            {/*Form thêm địa chỉ*/}
            {showAddressModal && (
                <div className="address-modal-overlay">
                    <div className="address-modal">
                        <div className="modal-header">
                            <b>Select Address</b>
                            <span onClick={() => setShowAddressModal(false)}>✕</span>
                        </div>
                        {/* 1. Hiển thị địa chỉ Active (Đã sửa bên Account) */}
                        {currentUser.activeAddress && (
                            <div
                                className={`address-item ${
                                    selectedAddress?.id === currentUser.activeAddress.id ? "active" : ""
                                }`}
                                onClick={() => {
                                    setSelectedAddress(currentUser.activeAddress);
                                    setShowAddressModal(false);
                                }}
                            >
                                <b>{currentUser.activeAddress.name} (Current)</b>
                                <p>{currentUser.activeAddress.text}</p>
                                <span>{currentUser.activeAddress.phone}</span>
                            </div>
                        )}
                        {currentUser.savedAddresses.map((addr, index) => (
                            <div
                                key={index}
                                className={`address-item ${selectedAddress?.id === addr.id ? "active" : ""}`}
                                onClick={() => {
                                    setSelectedAddress(addr);
                                    setShowAddressModal(false);
                                }}
                            >
                                <b>{addr.name}</b>
                                <p>{addr.text}</p>
                                <span>{addr.phone}</span>
                            </div>
                        ))}

                        <button className="add-address-btn" onClick={() => navigate("/account")}>
                            + Manage addresses in Account
                        </button>
                    </div>
                </div>
            )}
            {/* chọn option shipping */}
            {showShippingModal && (
                <div className="address-modal-overlay">
                    <div className="address-modal">
                        <div className="modal-header">
                            <b>Shipping Options</b>
                            <span onClick={() => setShowShippingModal(false)}>✕</span>
                        </div>

                        {/* Standard */}
                        <div
                            className={`address-item ${shippingOption === "standard" ? "active" : ""}`}
                            onClick={() => {
                                setShippingOption("standard");
                                setShowShippingModal(false);
                            }}
                        >
                            <b>{shippingOptions.standard.label}</b>
                            <p>Delivery: {shippingOptions.standard.time}</p>
                            <span>Fee: {shippingOptions.standard.fee.toLocaleString()} VND</span>
                        </div>

                        {/* Fast */}
                        <div
                            className={`address-item ${shippingOption === "fast" ? "active" : ""}`}
                            onClick={() => {
                                setShippingOption("fast");
                                setShowShippingModal(false);
                            }}
                        >
                            <b>{shippingOptions.fast.label}</b>
                            <p>Delivery: {shippingOptions.fast.time}</p>
                            <span>Fee: {shippingOptions.fast.fee.toLocaleString()} VND</span>
                        </div>
                    </div>
                </div>
            )}

            <Navbar/>
        </div>
    );
};

export default Checkout;