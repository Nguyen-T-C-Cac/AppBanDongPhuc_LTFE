import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/common/Navbar";
import '../styles/orderSuccess.css';
import iconCheck from '../assets/icon/order/checkorder.png';

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Lấy dữ liệu vừa gửi qua
    const { order } = location.state || {};

    const handleViewHistory = () => {
        let targetTab = "Confirmed"; // Mặc định
        if (order) {
            if (order.status === "Pending" || order.status === "Pending Payment") {
                targetTab = "Pending Payment";
            } else {
                targetTab = order.status;
            }
        }

        // Truyền state activeTab qua trang Orders
        navigate("/orders", { state: { activeTab: targetTab } });
    };

    if (!order) {
        return (
            <div className="success-page">
                <div className="success-container">
                    <h3>No Order Found</h3>
                    <button className="btn-continue" onClick={() => navigate("/")}>Go Home</button>
                </div>
                <Navbar/>
            </div>
        );
    }

    return (
        <div className="success-page">
            <div className="success-container">
                <div className="success-icon-box">
                    <img src={iconCheck} />
                </div>

                <h1 className="success-title">Order Successful!</h1>
                <p className="success-desc">
                    Thank you <b>{order.address.name}</b>! Your order has been placed successfully and is being processed.
                </p>

                {/* Tóm tắt đơn hàng */}
                <div className="summary-box">
                    <div className="summary-row">
                        <span>Order ID:</span>
                        <b>{order.id}</b>
                    </div>
                    <div className="summary-row">
                        <span>Date:</span>
                        <span>{order.date}</span>
                    </div>
                    <div className="summary-row">
                        <span>Payment:</span>
                        <span style={{textTransform: 'capitalize'}}>{order.paymentMethod}</span>
                    </div>
                    {/* Nếu có ngày dự kiến giao hàng thì hiển thị */}
                    {order.estimatedArrival && (
                        <div className="summary-row">
                            <span>Est. Delivery:</span>
                            <span>{order.estimatedArrival}</span>
                        </div>
                    )}
                    <div className="summary-row total">
                        <span>Total Amount:</span>
                        <span style={{color: '#27ae60'}}>{order.total.toLocaleString()} VND</span>
                    </div>
                </div>

                {/* Các nút điều hướng */}
                <div className="btn-group">
                    <button className="btn-continue" onClick={() => navigate("/cart")}>
                        Continue Shopping
                    </button>

                    <button className="btn-history" onClick={handleViewHistory}>
                        View Order History
                    </button>
                </div>
            </div>

            <Navbar/>
        </div>
    );
};

export default OrderSuccess;