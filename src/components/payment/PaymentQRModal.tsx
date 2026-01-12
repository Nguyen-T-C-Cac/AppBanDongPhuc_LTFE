import React, {useState} from 'react';
import '../../styles/qrBank.css';
import iconDownload from "../../assets/icon/checkout/download.svg"

interface PaymentQRModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalAmount: number;
}

const PaymentQRModal: React.FC<PaymentQRModalProps> = ({ isOpen, onClose, totalAmount }) => {
    // State để hiển thị loading khi đang tải ảnh
    const [isDownloading, setIsDownloading] = useState(false);
    if (!isOpen) return null;

    const qrValue = `ThanhToanDonHang_${totalAmount}`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrValue}`;

    const handleDownload = async () => {
        try {
            const response = await fetch(qrImageUrl);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `QR_Payment_${totalAmount}.png`; // tên file khi tải về
            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download QR failed:", error);
            alert("Không thể tải QR, vui lòng thử lại!");
        }
    };


    return (
        <div className="qr-modal-overlay" onClick={onClose}>
            {/* stopPropagation để click vào modal không bị đóng */}
            <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
                <h3 className="qr-title">BANK TRANSFER PAYMENT</h3>

                <div className="qr-box">
                    <img
                        src={qrImageUrl}
                        alt="Payment QR Code"
                        className="qr-code-img"
                    />
                    <div className="qr-bank-logo">
                        <span>NAPAS247</span> | <b style={{ color: '#f1c40f' }}>BIDV</b>
                    </div>
                </div>

                <p className="qr-scan-text">[ Scan To Pay ]</p>

                <div className="qr-info-row">
                    <span>Amount:</span>
                    <b className="qr-amount">{totalAmount.toLocaleString()} VND</b>
                </div>

                <p className="qr-status">
                    • Payment Status: <span className="status-waiting">Waiting for confirmation...</span>
                </p>
                <p className="qr-timer">
                    Please complete payment within: <span>5:00</span> minutes
                </p>

                <div className="qr-actions">
                    <button className="qr-btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="qr-btn-download" onClick={handleDownload}>
                        <img src={iconDownload}/> Download QR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentQRModal;