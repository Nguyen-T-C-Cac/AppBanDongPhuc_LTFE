
import { CartItem } from "../types/CartType";
import { Address } from "../types/AccountType";

export interface Order {
    id: string;
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
export const getOrders = (): Order[] => {
    const ordersJson = localStorage.getItem("orderHistory");
    return ordersJson ? JSON.parse(ordersJson) : [];
};

// Hàm lưu đơn hàng mới
export const saveOrder = (newOrder: Order) => {
    const currentOrders = getOrders();
    // Thêm đơn hàng mới vào đầu danh sách
    const updatedOrders = [newOrder, ...currentOrders];
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
};

export const updateOrder = (updatedOrder: Order) => {
    const orders = getOrders();
    const index = orders.findIndex(o => o.id === updatedOrder.id);
    if (index !== -1) {
        orders[index] = updatedOrder;
        localStorage.setItem("orderHistory", JSON.stringify(orders));
    }
};

export const getOrderById = (id: string): Order | undefined => {
    const orders = getOrders();
    return orders.find(o => o.id === id);
};