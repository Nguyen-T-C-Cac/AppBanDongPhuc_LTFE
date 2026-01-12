/*export interface User {
    username: string;
    email: string;
    avatar: string;

    address: {
        text: string;
        map: string;
    };
    contact: {
        phone: string;
    };
    payment: "bank" | "online" | "cod";
    isLogin: boolean;
    isMock?: boolean;
}*/
// src/types/AccountType.ts

export interface Address {
    id?: number;
    name: string;     // Nhà riêng, Công ty, hoặc tên User
    text: string;
    phone: string;
    map?: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    avatar: string;

    // Địa chỉ đang được chọn
    activeAddress: Address;

    // Danh sách các địa chỉ đã lưu
    savedAddresses: Address[];

    contact: {
        phone: string;
        email?: string;
    };

    payment: "bank" | "cod" | "online" | "deposit";
    isLogin: boolean;
    isMock?: boolean; // Đánh dấu đây là dữ liệu giả lập hay user thật
}
