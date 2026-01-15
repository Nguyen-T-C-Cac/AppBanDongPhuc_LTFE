import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, updateOrder, Order } from "../utils/orderUtil";
import Navbar from "../components/common/Navbar";
import PageHeader from "../components/common/PageHeader";
import LogoDetails from "../components/payment/LogoDetails";
import PaymentQRModal from "../components/payment/PaymentQRModal";
import "../styles/orderDetail.css";
import { Address } from "../types/AccountType";

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);

    // chỉnh sửa
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [tempAddress, setTempAddress] = useState<Address | null>(null);
    const [showConfirmCancel, setShowConfirmCancel] = useState(false);

    const [showConfirmBank, setShowConfirmBank] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);

    useEffect(() => {
        if (id) {
            const data = getOrderById(id);
            if (data) {
                setOrder(data);
                setTempAddress(data.address);
            }
        }
    }, [id]);

    if (!order) return <div style={{padding: 20}}>Loading or Order Not Found...</div>;

    // Hủy đơn hàng
    const handleCancelOrder = () => {
        const updatedOrder = { ...order, status: "Canceled" };
        updateOrder(updatedOrder);
        setOrder(updatedOrder);
        setShowConfirmCancel(false);
    };

    // Lưu địa chỉ mới
    const handleSaveAddress = () => {
        if (tempAddress && tempAddress.text.trim() !== "") {
            const updatedOrder = { ...order, address: tempAddress };
            updateOrder(updatedOrder);
            setOrder(updatedOrder);
            setIsEditingAddress(false);

        } else {
            alert("Address cannot be empty.");
        }
    };
//hiển thị tên Logo
    const getDisplayLogoName = (logoType: any) => {
        if (!logoType) return "No Logo";
        if (typeof logoType === 'string') return logoType;
        return logoType.logoType;
    };
    // Đổi từ COD sang Bank Transfer
    const processSwitchToBank = () => {
            const updatedOrder = {
                ...order,
                paymentMethod: "bank",
                status: "Pending Payment"
            };
            updateOrder(updatedOrder);
            // Cập nhật state trang hiện tại
            setOrder(updatedOrder);
            setShowConfirmBank(false);
            // Hiện Modal QR ngay lập tức
            setShowQRModal(true);

    };
    const onSwitchToBankClick = () => {
        setShowConfirmBank(true);
    };
    // Cho phép khi chưa giao hàng
    const canEdit = ["Pending Payment", "Pending", "Confirmed", "Processing"].includes(order.status);

    return (
        <div className="order-detail">
            <PageHeader title="Order detail" />

            <div className="detail-container">
                <div className="detail-card">
                    <div className="row">
                        <span>Order ID:</span> <b>{order.id}</b>
                    </div>
                    <div className="row">
                        <span>Date:</span> <span>{order.date}</span>
                    </div>
                    <div className="row">
                        <span>Status:</span>
                        <span className={`status-badge ${order.status.replace(" ", "-").toLowerCase()}`}>
                            {order.status}
                        </span>
                    </div>
                </div>

                <div className="detail-card">
                    <div className="card-title-row">
                        <h3>Shipping Address</h3>
                        {canEdit && !isEditingAddress && (
                            <button className="btn-edit" onClick={() => setIsEditingAddress(true)}>Edit</button>
                        )}
                    </div>

                    {isEditingAddress ? (
                        <div className="edit-address-form">
                            <input
                                type="text"
                                placeholder="Name"
                                value={tempAddress?.name}
                                onChange={e => setTempAddress({...tempAddress!, name: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                value={tempAddress?.phone}
                                onChange={e => setTempAddress({...tempAddress!, phone: e.target.value})}
                            />
                            <textarea
                                placeholder="Address"
                                value={tempAddress?.text}
                                onChange={e => setTempAddress({...tempAddress!, text: e.target.value})}
                            />
                            <div className="edit-actions">
                                <button className="btn-save" onClick={handleSaveAddress}>Save</button>
                                <button className="btn-cancel-edit" onClick={() => {
                                    setIsEditingAddress(false);
                                    setTempAddress(order.address); // Reset
                                }}>Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="address-display">
                            <p className="name">{order.address.name} <span>({order.address.phone})</span></p>
                            <p className="address">{order.address.text}</p>
                        </div>
                    )}
                </div>

                {/* 3. Danh sách sản phẩm */}
                <div className="detail-card items-card-container">
                    <h3>Product Info</h3>
                    {order.items.map((item, idx) => {
                        // Tính tổng số lượng
                        const totalQty = item.sizes.reduce((s, i) => s + i.quantity, 0);

                        return (
                            <div key={idx} className="checkout-item">
                                <div className="item-title">
                                    {item.name} <span>/ {item.price.toLocaleString()} VND</span>
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

                                            {item.sizes.map((s, i) => (
                                                <div key={i} className="table-row">
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
                </div>

                {/* 4. Thông tin thanh toán */}
                <div className="detail-card">
                    <h3>Payment Info</h3>
                    <div className="row">
                        <span>Method:</span>
                        <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>
                            {order.paymentMethod === 'cod' ? "Cash on Delivery" : order.paymentMethod}
                        </span>
                    </div>

                    {/* Logic đổi từ COD sang Bank */}
                    {canEdit && order.paymentMethod === 'cod' && (
                        <div className="payment-action">
                            <p className="hint-text">Want to pay via Bank Transfer instead?</p>
                            <button className="btn-switch-payment" onClick={onSwitchToBankClick}>
                                Pay via Bank Transfer
                            </button>
                        </div>
                    )}

                    <div className="divider"></div>
                    <div className="row"><p>Subtotal:</p>
                        <span>{(order.total - order.shippingFee).toLocaleString()} VND</span></div>
                    <div className="row"><p>Shipping:</p> <span>{order.shippingFee.toLocaleString()} VND</span>
                    </div>
                    <div className="row total-row"><span>Total:</span> <span>{order.total.toLocaleString()} VND</span>
                    </div>
                </div>

                {/* 5. Nút Hủy Đơn */}
                {canEdit && (
                    <div className="cancel-section">
                        <button className="btn-cancel-order" onClick={() => setShowConfirmCancel(true)}>
                            Cancel Order
                        </button>
                    </div>
                )}
            </div>

            {/* Modal Confirm Cancel */}
            {showConfirmCancel && (
                <div className="modal-overlay">
                    <div className="modal-confirm">
                        <h3>Cancel Order?</h3>
                        <p>Are you sure you want to cancel this order? This action cannot be undone.</p>
                        <div className="modal-actions">
                            <button onClick={() => setShowConfirmCancel(false)}>No, Keep it</button>
                            <button className="danger" onClick={handleCancelOrder}>Yes, Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {showConfirmBank && (
                <div className="modal-overlay">
                    <div className="modal-confirm">
                        <h3>Switch Payment Method?</h3>
                        <p>Order status will change to <b>Pending Payment</b>. Are you sure you want to pay via Bank Transfer?</p>
                        <div className="modal-actions">
                            <button onClick={() => setShowConfirmBank(false)}>Cancel</button>
                            <button className="confirm-blue" onClick={processSwitchToBank}>Yes, Switch & Pay</button>
                        </div>
                    </div>
                </div>
            )}
            <PaymentQRModal
                isOpen={showQRModal}
                onClose={() => setShowQRModal(false)}
                totalAmount={order.total}
            />
            <Navbar/>
        </div>
    );
};

export default OrderDetail;