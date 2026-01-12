
import { accountData } from "../data/account";
import { User, Address } from "../types/AccountType";
import defaultMap from "../assets/images/ImageHome/avarta/map2.png";
import defaultAvatar from "../assets/images/avtAccount/avt.png";

const normalizeUser = (raw: any): User => {
    const listAddress = raw.addresses || [];

    const currentText = raw.address?.text || (listAddress.length > 0 ? listAddress[0].text : "");
    const currentPhone = raw.address?.phone || raw.contact?.phone || (listAddress.length > 0 ? listAddress[0].phone : "");

    const activeAddress: Address = {
        name: raw.username || raw.name || "My Address",
        text: currentText,
        phone: currentPhone,
        map: raw.address?.map || defaultMap
    };

    return {
        id: raw.id,
        username: raw.username || raw.name || "User",
        email: raw.email || "",
        avatar: raw.avatar || defaultAvatar,

        activeAddress: activeAddress,
        savedAddresses: listAddress, // Giữ lại danh sách gốc để chọn

        contact: {
            phone: raw.contact?.phone || "",
            email: raw.email || ""
        },

        payment: raw.payment || "cod",
        isLogin: true,
        isMock: raw.isMock || false
    };
};

export const getCurrentUser = (): User | null => {

    const storedJson = localStorage.getItem("currentUser");
    if (!storedJson) return null;

    const storedUser = JSON.parse(storedJson);
    if (!storedUser.isLogin) return null;

    const dbUser = accountData.users.find((u: any) => u.id === storedUser.id || u.email === storedUser.email);

    const mergedRawUser = {
        ...dbUser,      // Gốc
        ...storedUser,  // Mới nhất
        username: storedUser.username || storedUser.name || dbUser?.name
    };

    return normalizeUser(mergedRawUser);
};

export const saveCurrentUser = (user: User) => {

    const dataToSave = {
        ...user,
        name: user.username,
        address: {
            text: user.activeAddress.text,
            map: user.activeAddress.map
        },
        contact: {
            phone: user.contact.phone
        }
    };
    localStorage.setItem("currentUser", JSON.stringify(dataToSave));
};