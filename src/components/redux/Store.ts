import React from 'react';
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../redux/Search";
import cartReducer from "../redux/Cart";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
