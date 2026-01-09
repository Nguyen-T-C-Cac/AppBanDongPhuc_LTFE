import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartItem } from "../types/CartType"; // Import type cũ của bạn
import Navbar from "../components/common/Navbar";
import '../styles/cart.css';
import PageHeader from "../components/common/PageHeader"; // Tận dụng CSS cũ hoặc tạo file checkout.css mới

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Lấy dữ liệu được gửi từ trang Cart
    const checkoutItems: CartItem[] = location.state?.items || [];

    // Tính lại tổng tiền
    const merchandiseSubtotal = checkoutItems.reduce((total, item) => {
        const itemQuantity = item.sizes.reduce((sum, s) => sum + s.quantity, 0);
        return total + (item.price * itemQuantity);
    }, 0);

    const shippingFee = 25000;
    const totalPayment = merchandiseSubtotal + shippingFee;

    //hiển thị tên Logo
    const getDisplayLogoName = (logoType: any) => {
        if (!logoType) return "No Logo";
        if (typeof logoType === 'string') return logoType;
        return logoType.logoType;
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

    return (
        <div className="checkout-page" >
            <PageHeader
                title="Checkout"
            />
            {/* Shipping Address */}
            <div className="section-block">
                <div className="shippingAddress">
                    <b>Shipping Address</b>
                    <button className="btnchange" >Change Address</button>
                </div>
                <div style={{ fontSize: '14px', color: '#555' }}>
                    <p><strong>Nguyen Thi</strong> (0909xxxxxx)</p>
                    <p>Company Uniform91</p>
                    <p>123 Nguyen Van Linh, Dist 7, Ho Chi Minh City</p>
                </div>
            </div>

            {/* List Items */}
            <div className="checkout-items-list">
                {checkoutItems.map((item) => {
                    const itemTotalQty = item.sizes.reduce((s, i) => s + i.quantity, 0);
                    return (
                        <div key={item.id} className="section-block" style={{ background: 'white', padding: '15px', marginTop: '10px' }}>
                            <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                                {item.name} / <span style={{ color: '#666' }}>{item.price.toLocaleString()} VNĐ</span>
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />

                                <div style={{ flex: 1, fontSize: '13px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                                        {/* Hiển thị chi tiết từng Size */}
                                        <div style={{ gridColumn: '1 / -1', marginBottom: '5px' }}>
                                            {item.sizes.map(s => (
                                                <div key={s.size} style={{ display: 'flex', justifyContent: 'space-between', color: '#777' }}>
                                                    <span>Size {s.size}</span>
                                                    <span>x{s.quantity}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Thuộc tính khác */}
                                        <div style={{ background: '#eee', padding: '2px 5px', borderRadius: '4px', textAlign: 'center' }}>
                                            {item.gender}
                                        </div>
                                        <div style={{ background: '#eee', padding: '2px 5px', borderRadius: '4px', textAlign: 'center' }}>
                                            {getDisplayLogoName(item.logoType)}
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'right', marginTop: '10px', fontWeight: 'bold' }}>
                                        Total Quantity: {itemTotalQty}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Payment Details */}
            <div className="section-block" style={{ background: 'white', padding: '15px', marginTop: '10px' }}>
                <h4 style={{ marginBottom: '10px' }}>Payment Details</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ color: '#777' }}>Merchandise Subtotal:</span>
                    <span>{merchandiseSubtotal.toLocaleString()} VNĐ</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#777' }}>Shipping Subtotal:</span>
                    <span>{shippingFee.toLocaleString()} VNĐ</span>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px' }}>
                    <span>Total Payment:</span>
                    <span>{totalPayment.toLocaleString()} VNĐ</span>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="checkout-footer" style={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
                background: '#fff', padding: '10px 15px',
                boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
                display: 'flex', justifyContent: 'flex-end', alignItems: 'center'
            }}>
                <button style={{
                    background: 'orange', color: 'white', border: 'none',
                    padding: '12px 24px', borderRadius: '4px', fontWeight: 'bold', fontSize: '16px'
                }}>
                    Place Order
                </button>
            </div>

            {/* Navbar Global (Nếu cần) */}
            <div style={{ display: 'none' }}><Navbar /></div>
        </div>
    );
};

export default Checkout;
