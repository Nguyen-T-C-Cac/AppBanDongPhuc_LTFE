import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, updateOrder, Order } from "../utils/orderUtil";
import Navbar from "../components/common/Navbar";
import PageHeader from "../components/common/PageHeader";
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
        alert("Order has been canceled.");
    };

    // Lưu địa chỉ mới
    const handleSaveAddress = () => {
        if (tempAddress && tempAddress.text.trim() !== "") {
            const updatedOrder = { ...order, address: tempAddress };
            updateOrder(updatedOrder);
            setOrder(updatedOrder);
            setIsEditingAddress(false);
            alert("Address updated successfully!");
        } else {
            alert("Address cannot be empty.");
        }
    };

    // Đổi từ COD sang Bank Transfer
    const handleSwitchToBank = () => {
        if (window.confirm("Switch payment method to Bank Transfer? Order status will change to Pending Payment.")) {
            const updatedOrder = {
                ...order,
                paymentMethod: "bank",
                status: "Pending Payment"
            };
            updateOrder(updatedOrder);
            setOrder(updatedOrder);
            alert("Switched to Bank Transfer. Please check your email/QR for payment info.");
            // Có thể navigate sang trang QR hoặc hiện popup QR tại đây nếu muốn

        }
    };

    // Cho phép khi chưa giao hàng
    const canEdit = ["Pending Payment", "Pending", "Confirmed", "Processing"].includes(order.status);

    return (
        <div className="order-detail-page">
            <PageHeader title="Order detail" />
            <div className="detail-container">
                {/* 1. Thông tin trạng thái */}
                <div className="detail-card status-card">
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

                {/* 2. Địa chỉ giao hàng (Có nút Edit) */}
                <div className="detail-card">
                    <div className="card-title-row">
                        <h3>Shipping Address</h3>
                        {canEdit && !isEditingAddress && (
                            <button className="btn-small-edit" onClick={() => setIsEditingAddress(true)}>Edit</button>
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
                                }}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className="address-display">
                            <p><b>{order.address.name}</b> ({order.address.phone})</p>
                            <p>{order.address.text}</p>
                        </div>
                    )}
                </div>

                {/* 3. Danh sách sản phẩm */}
                <div className="detail-card">
                    <h3>Items</h3>
                    {order.items.map((item, idx) => (
                        <div key={idx} className="detail-item-row">
                            <img src={item.image} alt={item.name} />
                            <div className="detail-item-info">
                                <p className="d-name">{item.name}</p>
                                <p className="d-price">{item.price.toLocaleString()} VND</p>
                                <div className="d-meta">
                                    Qty: {item.sizes.reduce((s,c)=>s+c.quantity, 0)} | {item.gender}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 4. Thông tin thanh toán (Có nút đổi phương thức) */}
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
                            <button className="btn-switch-payment" onClick={handleSwitchToBank}>
                                Pay via Bank Transfer
                            </button>
                        </div>
                    )}

                    <div className="divider"></div>
                    <div className="row"><span>Subtotal:</span> <span>{(order.total - order.shippingFee).toLocaleString()} VND</span></div>
                    <div className="row"><span>Shipping:</span> <span>{order.shippingFee.toLocaleString()} VND</span></div>
                    <div className="row total-row"><span>Total:</span> <span>{order.total.toLocaleString()} VND</span></div>
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

            <Navbar/>
        </div>
    );
};

export default OrderDetail;