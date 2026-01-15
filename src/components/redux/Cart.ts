import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../types/CartType";

interface CartState {
    carts: {
        [userId: number]: CartItem[];
    };
}

const initialState: CartState = {
    carts: {},
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        /* ================= ADD TO CART ================= */
        addToCart: (
            state,
            action: PayloadAction<{
                userId: number;
                item: CartItem;
            }>
        ) => {
            const { userId, item } = action.payload;

            // tạo cart cho user nếu chưa có
            if (!state.carts[userId]) {
                state.carts[userId] = [];
            }

            const cart = state.carts[userId];

            const existing = cart.find(
                i => i.name === item.name
            );

            if (existing) {
                // gộp size
                item.sizes.forEach(newSize => {
                    const oldSize = existing.sizes.find(
                        s => s.size === newSize.size
                    );

                    if (oldSize) {
                        oldSize.quantity += newSize.quantity;
                    } else {
                        existing.sizes.push(newSize);
                    }
                });

                existing.logoType = item.logoType;
            } else {
                cart.push(item);
            }
        },

        /* ================= REMOVE ITEM ================= */
        removeFromCart: (
            state,
            action: PayloadAction<{
                userId: number;
                cartItemId: number;
            }>
        ) => {
            const { userId, cartItemId } = action.payload;

            if (!state.carts[userId]) return;

            state.carts[userId] = state.carts[userId].filter(
                item => item.id !== cartItemId
            );
        },
        updateSizeQuantity: (
            state,
            action: PayloadAction<{
                userId: number;
                cartItemId: number;
                size: string;
                delta: 1 | -1;
            }>
        ) => {
            const { userId, cartItemId, size, delta } = action.payload;
            const cart = state.carts[userId];
            if (!cart) return;

            const item = cart.find(i => i.id === cartItemId);
            if (!item) return;

            const sizeItem = item.sizes.find(s => s.size === size);
            if (!sizeItem) return;

            sizeItem.quantity = Math.max(0, sizeItem.quantity + delta);
        },

        updateLogoCustomization: (
            state,
            action: PayloadAction<{
                userId: number;
                cartItemId: number;
                logoCustomization: any;
            }>
        ) => {
            const { userId, cartItemId, logoCustomization } = action.payload;
            const cart = state.carts[userId];
            if (!cart) return;

            const item = cart.find(i => i.id === cartItemId);
            if (item) {
                item.logoType = logoCustomization;
            }
        },

    },
});

export const { addToCart, removeFromCart,updateSizeQuantity,
    updateLogoCustomization, } = cartSlice.actions;
export default cartSlice.reducer;
