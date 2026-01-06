import React from 'react';
// src/components/redux/cartTypes.ts

export interface SizeItem {
    size: string;        // S, M, L
    quantity: number;    // số lượng
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;

    sizes: SizeItem[];

    gender?: string;     // Women / Men / Women-Men
    logoType?: string;   // No logo / Print / Embroidery
}
