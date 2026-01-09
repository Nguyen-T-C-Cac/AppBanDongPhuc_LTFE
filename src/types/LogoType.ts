
export interface LogoCustomization {
    logoType: string; // "Printing", "Embroidery"...
    positions: string[];
    width: string;
    height: string;
    notes: string;
    image?: string;
}

export interface SizeItem {
    size: string;
    quantity: number;
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    gender: string;
    logoType: string | LogoCustomization;
    sizes: SizeItem[];
}