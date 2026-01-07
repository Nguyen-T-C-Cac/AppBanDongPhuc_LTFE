import React from 'react';
import Header from '../components/common/Header2';
import Navbar from '../components/common/Navbar';

const BackLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="layout">
            <Header />
            <div className="content">{children}</div>
            <Navbar />
        </div>
    );
};

export default BackLayout;
