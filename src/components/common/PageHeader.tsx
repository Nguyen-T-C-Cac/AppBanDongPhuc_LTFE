import React from "react";
import backIcon from "../../assets/icon/cart/Arrow_left.svg";
import "../../styles/pageHeader.css";

interface PageHeaderProps {
    title: string;
    count?: number;
    onBack?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({title, count, onBack}) => {
    return (
        <div className="pageHeader">
            <img
                src={backIcon}
                className="backBtn"
                onClick={onBack ? onBack : () => window.history.back()}
                alt="Back"
            />

            <span className="title">{title}</span>

            {count !== undefined && (
                <span className="countBadge">{count}</span>
            )}
        </div>
    );
};
export default PageHeader;