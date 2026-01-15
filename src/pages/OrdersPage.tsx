import React, { useEffect, useState } from "react";
import { getOrders, Order } from "../utils/orderUtil";
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "../components/common/Navbar";
import PageHeader from "../components/common/PageHeader";
import iconDate from "../assets/icon/order/Calendar_light.svg"
import "../styles/order.css"

const TABS = ["Pending Payment", "Confirmed", "In Production", "Shipped", "Delivered", "Canceled"];
const Orders: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [orders, setOrders] = useState<Order[]>([]);
    const [activeTab, setActiveTab] = useState(location.state?.activeTab ||"Confirmed");
    // Lấy thông tin user hiện tại
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    useEffect(() => {
        if (!currentUser) {

            navigate("/login");
            return;
        }
        // Load danh sách đơn hàng từ LocalStorage
        const data = getOrders(currentUser.id);
        setOrders(data);
    }, [navigate]);
    // Lọc đơn hàng theo Tab
    const filteredOrders = orders.filter(order => {
        if (activeTab === "Pending Payment") {
            return order.status === "Pending Payment" || order.status === "Pending";
        }
        return order.status === activeTab;
    });
    // Hàm render chi tiết Size (Grid giống ảnh)
    const renderSizeGrid = (items: any[]) => {

        return items.map((item, idx) => (
            <div key={idx} className="item-detail-block">

                <div className="size-grid">
                    <div className="grid-header">Size</div>
                    <div className="grid-header">Quantity</div>
                    <div className="grid-header">Gender</div>
                    <div className="grid-header">Logo type</div>

                    {item.sizes.map((s: any, i: number) => (
                        <div key={i} className="grid-row-item">
                            <div className="size-box">{s.size}</div>
                            <div className="qty-box">{s.quantity}</div>
                            <div className="gender-box">{item.gender}</div>
                            <div className="logo-box">
                                {typeof item.logoType === 'string' ? item.logoType : item.logoType?.logoType || "No Logo"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };
    return (<div className="orders-page">
        <PageHeader title="Orders List" count={filteredOrders.length}/>
        <div className="orders-tabs">
            {TABS.map(tab => (
                <div
                    key={tab}
                    className={`tab-item ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </div>
            ))}
        </div>
        <div className="orders-list-content">
            {filteredOrders.length === 0 ? (
                <div className="no-orders">No orders in "{activeTab}" status.</div>
            ) : (
                filteredOrders.map(order => {
                    // Tính tổng số lượng item trong đơn
                    const totalQuantity = order.items.reduce((acc, item) =>
                            acc + item.sizes.reduce((sAcc: number, s: any) => sAcc + s.quantity, 0)
                        , 0);

                    return (
                        <div key={order.id} className="order-card">
                            {/* Header: ID & Date */}
                            <div className="card-header-bar">
                                <span className="order-id">{order.id}</span>
                                <div className="order-date">
                                <img src={iconDate}/><span>{order.date}</span>
                                </div>
                            </div>

                            {/* Body: Loop qua từng item */}
                            {order.items.map((item, index) => (
                                <div key={index}>
                                    <div className="card-body">
                                        <img src={item.image} alt={item.name} className="product-img"/>

                                        <div className="product-info">
                                            <div className="product-name">
                                                {item.name} <span>/ {item.price.toLocaleString()} VNĐ</span>
                                            </div>

                                            {/* Grid Size/Qty/Gender/Logo */}
                                            {renderSizeGrid([item])}
                                        </div>

                                        <span className="view-details"
                                              onClick={() => navigate(`/order-detail/${encodeURIComponent(order.id)}`)}>
                                            View Details &gt;&gt;</span>
                                    </div>
                                </div>
                            ))}

                            {/* Summary: Total Qty */}
                            <div className="order-summary">
                                <span className="total-qty-text">Total Quantity: {totalQuantity}</span>
                            </div>

                            {/* Footer: Total Payment */}
                            <div className="card-footer-bar">
                                Total Payment: <b>{order.total.toLocaleString()} VNĐ</b>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
        <Navbar/>
    </div>)
};
export default Orders;