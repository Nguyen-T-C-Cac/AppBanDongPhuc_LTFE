import React, {useState} from 'react';
import '../styles/cart.css'
import {RootState} from "../components/redux/Store";
import CartItem from "../components/cart/CartItem";
import PageHeader from "../components/common/PageHeader";
import Navbar from "../components/common/Navbar";
import iconCoin from "../assets/icon/cart/currency-coin-dollar.svg"
import iconShipping from "../assets/icon/cart/delivery.svg"
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "null"
    );

    const currentUserId: number | null = currentUser?.id ?? null;

    const cartItems = useSelector((state: RootState) =>
        currentUserId ? state.cart.carts[currentUserId] ?? [] : []
    );

    // State lưu danh sách ID các sản phẩm được tick chọn
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

    // Nhấn nút All
    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedItems([]); // Bỏ chọn hết
        } else {
            setSelectedItems(cartItems.map(item => item.id));
        }
    };
    // Nhấn vào từng item
    const handleSelectItem = (id: number) => {
        if (selectedItems.includes(id)) {
            // Nếu đã có thì bỏ ra
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };
    // Tính tổng tiền
    const totalPrice = cartItems.reduce((total, item) => {
        if (selectedItems.includes(item.id)) {
            const itemTotal = item.sizes.reduce((sum, s) => sum + s.quantity, 0) * item.price;
            return total + itemTotal;
        }
        return total;
    }, 0);
    // Check out
    const handleCheckout = () => {
        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
            return;
        }

        // Lọc ra danh sách các object item đầy đủ dựa trên ID đã chọn
        const itemsToCheckout = cartItems.filter(item => selectedItems.includes(item.id));

        navigate('/checkout', {
            state: {
                items: itemsToCheckout,
                totalPrice: totalPrice
            }
        });
    };
    return (<div className="cart">
            <PageHeader
                title="Shopping Cart"
                count={cartItems.length}
            />
            <div className="cart-list">
                {cartItems.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                        userId={currentUserId!}
                        // Truyền trạng thái chọn và hàm xử lý xuống con
                        isSelected={selectedItems.includes(item.id)}
                        onToggleSelect={() => handleSelectItem(item.id)}
                    />
                ))}
            </div>
            <div className="cart-bottom-section">

                <div className="cart-summary-info">
                    <div className="summary-row">
                        <div className="summary-label">
                            <img src={iconCoin} alt="coin"/>
                            <span>Price:</span>
                        </div>
                        <div className="summary-value red">
                            {totalPrice.toLocaleString()} VND
                        </div>
                    </div>

                    <div className="summary-row">
                        <div className="summary-label">
                            <img src={iconShipping} alt="shipping"/>
                            <span>Shipping:</span>
                        </div>
                        <div className="summary-value green">Free</div>
                    </div>
                </div>

                <div className="cart-action-bar">
                    <label className="select-all-checkbox">
                        <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                        />
                        <span>All</span>
                    </label>

                    <button className="checkout-btn" onClick={handleCheckout}>
                        Check out ({selectedItems.length})
                    </button>
                </div>
            </div>
            <Navbar/>
        </div>
    );
};
export default Cart;