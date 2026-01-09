import { Outlet } from "react-router-dom";

const LoginLayout = () => {
    return (
        <div className="welcome-layout">
            <Outlet />
        </div>
    );
};

export default LoginLayout;
