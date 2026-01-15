import React, {useEffect, useState} from 'react';
import '../../styles/qrBank.css';
import iconDownload from "../../assets/icon/checkout/download.svg"

interface PaymentQRModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalAmount: number;
}

const PaymentQRModal: React.FC<PaymentQRModalProps> = ({ isOpen, onClose, totalAmount }) => {
    // State để hiển thị loading khi đang tải ảnh
    const [timeLeft, setTimeLeft] = useState(300); //5p=300s
    const [isDownloading, setIsDownloading] = useState(false);

    // Xử lý đếm ngược
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isOpen) {
            // Reset lại 5 phút mỗi khi mở modal
            setTimeLeft(300);

            timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        // đóng modal
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isOpen]);

    // chuyển giây thành mm:ss
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (!isOpen) return null;

    const qrValue = `ThanhToanDonHang_${totalAmount}`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrValue}`;

    const handleDownload = async () => {
        try {
            setIsDownloading(true);
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
        }finally {
            setIsDownloading(false);
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
                        style={{ opacity: timeLeft === 0 ? 0.3 : 1 }} //làm mờ qr
                    />
                    {timeLeft === 0 && (
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'red', fontWeight: 'bold', background: 'rgba(255,255,255,0.9)', padding: '5px 10px'
                        }}>
                            EXPIRED
                        </div>
                    )}
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
                    Please complete payment within:<span style={{
                    color: timeLeft < 60 ? 'red' : 'green', // Chuyển đỏ khi còn dưới 1 phút
                    fontWeight: 'bold',
                    marginLeft: '5px'
                }}>
                        {formatTime(timeLeft)}
                    </span> minutes
                </p>

                <div className="qr-actions">
                    <button className="qr-btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="qr-btn-download" onClick={handleDownload}
                            disabled={timeLeft === 0 || isDownloading} // Khóa nút khi hết giờ
                            style={{ opacity: (timeLeft === 0 || isDownloading) ? 0.5 : 1 }}>
                        <img src={iconDownload} alt="download"/>
                         {isDownloading ? " Downloading..." : " Download QR"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentQRModal;