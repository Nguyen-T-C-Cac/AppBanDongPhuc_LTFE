import {LogoCustomization} from "../../types/CartType";
import '../../styles/checkout.css';
import React from "react";

interface LogoDetailsProps {
    logoData: string | LogoCustomization | undefined;
}
const LogoDetails: React.FC<LogoDetailsProps> = ({ logoData }) => {
    if (!logoData || logoData === "No Logo") return null;

    if (typeof logoData === 'string') {
        return <div className="logo-simple-tag">Logo: {logoData}</div>;
    }

    if (logoData.logoType === "No Logo") return null;

    return (
        <div className="custom-logo-details">
            <div className="custom-header">Logo Customization Details</div>
            <div className="custom-grid">
                <div className="custom-row">
                    <span className="c-label">Type:</span>
                    <span className="c-value">{logoData.logoType}</span>
                </div>

                {logoData.positions.length > 0 && (
                    <div className="custom-row">
                        <span className="c-label">Positions:</span>
                        <span className="c-value">{logoData.positions.join(", ")}</span>
                    </div>
                )}

                {(logoData.width || logoData.height) && (
                    <div className="custom-row">
                        <span className="c-label">Size:</span>
                        <span className="c-value">
                                {logoData.width || "?"}cm (W) x {logoData.height || "?"}cm (H)
                            </span>
                    </div>
                )}

                {logoData.notes && (
                    <div className="custom-row full-width">
                        <span className="c-label">Note:</span>
                        <span className="c-value note-text">{logoData.notes}</span>
                    </div>
                )}

                {logoData.image && (
                    <div className="custom-row full-width">
                        <span className="c-label">Uploaded Logo:</span>
                        <div className="uploaded-logo-box">
                            <img src={logoData.image} alt="Customer Logo" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default LogoDetails;