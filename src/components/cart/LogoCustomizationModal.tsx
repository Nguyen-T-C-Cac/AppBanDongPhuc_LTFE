import React, { useState, useRef, useEffect } from "react";
import '../../styles/cart.css';
import { LogoCustomization } from "../../types/CartType";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: LogoCustomization) => void;
    initialData: LogoCustomization;
}

const LogoCustomizationModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData }) => {
    // State nội bộ của Modal
    const [logoData, setLogoData] = useState<LogoCustomization>(initialData);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Reset dữ liệu mỗi khi mở modal hoặc initialData thay đổi
    useEffect(() => {
        setLogoData(initialData);
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    // Xử lý chọn Position
    const handlePositionChange = (pos: string) => {
        setLogoData(prev => {
            const exists = prev.positions.includes(pos);
            if (exists) {
                return { ...prev, positions: prev.positions.filter(p => p !== pos) };
            } else {
                return { ...prev, positions: [...prev.positions, pos] };
            }
        });
    };

    // Xử lý upload ảnh
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setLogoData(prev => ({
                ...prev,
                image: reader.result as string
            }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="logo-modal-overlay" onClick={onClose}>
            <div className="logo-modal" onClick={(e) => e.stopPropagation()}>
                <h3 className="logo-modal-title">LOGO CUSTOMIZATION</h3>

                {/* Logo Type */}
                <div className="logo-section">
                    <div className="section-label">Logo type</div>
                    <div className="logo-grid-3">
                        {["No Logo", "Printing", "Embroidery"].map((type) => (
                            <label key={type} className="radio-box">
                                <input
                                    type="radio"
                                    name="logoType"
                                    checked={logoData.logoType === type}
                                    onChange={() => setLogoData({ ...logoData, logoType: type })}
                                />
                                <span>{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Position */}
                <div className="logo-section">
                    <div className="section-label">Position</div>
                    <div className="logo-grid-2">
                        {["Left Chest", "Right Chest", "Back", "Sleeve"].map((pos) => (
                            <label key={pos} className="radio-box">
                                <input
                                    type="checkbox"
                                    checked={logoData.positions.includes(pos)}
                                    onChange={() => handlePositionChange(pos)}
                                />
                                <span>{pos}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Size (cm) */}
                <div className="logo-section">
                    <div className="section-label">Size (cm)</div>
                    <div className="logo-size-row">
                        <div className="size-input-group">
                            <span>Width:</span>
                            <input
                                type="text"
                                value={logoData.width}
                                onChange={(e) => setLogoData({ ...logoData, width: e.target.value })}
                            />
                        </div>
                        <div className="size-input-group">
                            <span>Height:</span>
                            <input
                                type="text"
                                value={logoData.height}
                                onChange={(e) => setLogoData({ ...logoData, height: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Upload */}
                <div className="logo-section">
                    <div className="section-label">Upload</div>
                    <div className="upload-row">
                        <button className="upload-btn" type="button" onClick={handleUploadClick}>
                            <span>Upload Logo</span>
                        </button>

                        {logoData.image && (
                            <div className="logo-preview">
                                <img src={logoData.image} alt="logo preview" />
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Notes */}
                <div className="logo-section">
                    <div className="section-label">Notes</div>
                    <textarea
                        className="logo-notes"
                        value={logoData.notes}
                        onChange={e => setLogoData({ ...logoData, notes: e.target.value })}
                    />
                </div>

                {/* Footer Buttons */}
                <div className="logo-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="save-btn" onClick={() => onSave(logoData)}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoCustomizationModal;