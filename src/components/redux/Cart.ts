import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../types/CartType";

const fakeCartItems: CartItem[] = [
    {
        id: 1,
        name: "Áo polo thể dục",
        price: 112000,
        image: "/images/cart/polo.png",
        gender: "Women / Men",
        logoType: "No logo",
        sizes: [
            { size: "S", quantity: 1 },
            { size: "M", quantity: 5 },
            { size: "L", quantity: 6 },
        ],
    },
    {
        id: 2,
        name: "Áo lớp đặt theo yêu cầu",
        price: 157000,
        image: "/images/cart/aolop.png",
        gender: "Women / Men",
        logoType: "Print",
        sizes: [
            { size: "S", quantity: 3 },
            { size: "M", quantity: 11 },
            { size: "L", quantity: 22 },
        ],
    },
    {
        id: 3,
        name: "Sơ mi nữ dài tay đồng phục",
        price: 259000,
        image: "/images/cart/somi.png",
        gender: "Women",
        logoType: "Embroidery",
        sizes: [
            { size: "S", quantity: 50 },
            { size: "M", quantity: 71 },
            { size: "L", quantity: 121 },
        ],
    },
];

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    //items: [],
    items: fakeCartItems,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existing = state.items.find(
                item => item.id === action.payload.id
            );

            if (existing) {
                // gộp size
                action.payload.sizes.forEach(newSize => {
                    const oldSize = existing.sizes.find(
                        s => s.size === newSize.size
                    );
                    if (oldSize) {
                        oldSize.quantity += newSize.quantity;
                    } else {
                        existing.sizes.push(newSize);
                    }
                });
            } else {
                state.items.push(action.payload);
            }
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                item => item.id !== action.payload
            );
        },
        updateSizeQuantity(
            state,
            action: PayloadAction<{
                id: number;
                size: string;
                delta: 1 | -1;
            }>
        ) {
            const { id, size, delta } = action.payload;
            const item = state.items.find(i => i.id === id);
            if (!item) return;

            const sizeItem = item.sizes.find(s => s.size === size);
            if (!sizeItem) return;

            sizeItem.quantity = Math.max(0, sizeItem.quantity + delta);
        },

        updateLogoCustomization(
            state,
            action: PayloadAction<{
                id: number;
                logoCustomization: any;
            }>
        ) {
            const { id, logoCustomization } = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item) {
                item.logoType = logoCustomization;
            }
        },

    },
});

export const { addToCart, removeFromCart, updateSizeQuantity, updateLogoCustomization} = cartSlice.actions;
export default cartSlice.reducer;
