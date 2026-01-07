// src/types/ProductType.ts

export interface ProductSize {
    size: string;       // ví dụ: S, M, L
    stock: number;      // số lượng tồn kho
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];      // danh sách ảnh
    category: string;      // ví dụ: "Uniform", "Shirt"
    genders?: string[];    // ["Men", "Women"]
    sizes: ProductSize[];  // danh sách size và stock
    minimumOrderQuantity: number;
    colors?: string[];     // ví dụ ["Red", "Blue"]
    types?: string[];      // ví dụ ["Premium", "Standard"]
    allowLogoUpload?: boolean; // có cho phép upload logo
}
