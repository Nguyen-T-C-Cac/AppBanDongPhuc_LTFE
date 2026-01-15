import React from 'react';
// src/components/redux/cartTypes.ts
export interface LogoCustomization {
    logoType: string; // "Printing", "Embroidery", "No Logo"
    positions: string[];
    width: string;
    height: string;
    image?: string;
    notes: string;
}

export interface SizeItem {
    size: string;        // S, M, L
    quantity: number;    // số lượng
}

export interface CartItem {
    id: number;
    idAccount: number;
    name: string;
    price: number;
    image: string;

    sizes: SizeItem[];

    gender?: string;     // Women / Men / Women-Men
    logoType?: string | LogoCustomization;   // No logo / Print / Embroidery
}
