
import { CartItem } from "../types/CartType";
import { Address } from "../types/AccountType";

export interface Order {
    id: string;
    userId: number;
    date: string;
    items: CartItem[];
    total: number;
    shippingFee: number;
    shippingOption: string;
    paymentMethod: string;
    status: string;         // Pending, Processing, Completed, Cancelled
    address: Address;       // Địa chỉ giao hàng
    estimatedArrival: string;
}

// Hàm lấy danh sách đơn hàng
export const getOrders = (userId: number | null): Order[] => {
    const ordersJson = localStorage.getItem("orderHistory");
    const allOrders: Order[] = ordersJson ? JSON.parse(ordersJson) : [];

    if (!userId) return []; // Không có user thì không trả về gì cả

    // Chỉ trả về đơn hàng có userId trùng với người đang login
    return allOrders.filter(order => order.userId === userId);

};

// Hàm lưu đơn hàng mới
export const saveOrder = (newOrder: Order) => {
    const ordersJson = localStorage.getItem("orderHistory");
    const currentOrders: Order[] = ordersJson ? JSON.parse(ordersJson) : [];
    // Thêm đơn hàng mới vào đầu danh sách
    const updatedOrders = [newOrder, ...currentOrders];
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
};

export const updateOrder = (updatedOrder: Order) => {
    const ordersJson = localStorage.getItem("orderHistory");
    const orders: Order[] = ordersJson ? JSON.parse(ordersJson) : [];

    const index = orders.findIndex(o => o.id === updatedOrder.id);
    if (index !== -1) {
        orders[index] = updatedOrder;
        localStorage.setItem("orderHistory", JSON.stringify(orders));
    }
};

export const getOrderById = (id: string): Order | undefined => {
    const ordersJson = localStorage.getItem("orderHistory");
    const orders: Order[] = ordersJson ? JSON.parse(ordersJson) : [];
    return orders.find(o => o.id === id);
};