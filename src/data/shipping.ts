export const shippingOptions = {
    standard: {
        label: "Standard Express",
        fee: 125000,
        time: "2–4 days",
        minDays: 2,
        maxDays: 4
    },
    fast: {
        label: "Fast Delivery",
        fee: 300000,
        time: "1–2 days",
        minDays: 1,
        maxDays: 2
    }
} as const;
