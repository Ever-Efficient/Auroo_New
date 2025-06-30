import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./login";
import { Tooltip } from "primereact/tooltip";

export default function TopBar() {
    const navigate = useNavigate();
    const [loginVisible, setLoginVisible] = useState(false);
    const [username, setUsername] = useState<string | null>(null);

    const handleLoginSuccess = (email: string) => {
        const name = email.split("@")[0];
        setUsername(name);
        setLoginVisible(false);
    };

    const handleLogout = () => {
        setUsername(null);
    };

    return (
        <div className="surface-100 border-bottom px-3 py-3">
            <div className="flex flex-column md:flex-row align-items-center justify-content-between w-full gap-3">
                <div className="flex flex-wrap gap-3 font-bold text-sm cursor-pointer justify-content-center md:justify-content-start w-full md:w-4">
                    <span onClick={() => navigate("/")}>HOME</span>
                    <span onClick={() => navigate("/womens")}>WOMENS</span>
                    <span onClick={() => navigate("/kids")}>KIDS</span>
                    <span onClick={() => navigate("/sale")}>SALE</span>
                    {/*<span onClick={() => navigate("/blog")}>BLOG</span>*/}
                    <span onClick={() => navigate("/contact")}>CONTACT</span>
                </div>

                <div className="flex justify-content-center w-full md:w-4">
                    <img
                        src="/logos/Auro_o_fashion_01.png"
                        alt="Auroo Fashion Logo"
                        className="cursor-pointer"
                        style={{ width: '150px', height: '50px' }}
                        onClick={() => navigate("/")}
                    />
                </div>

                <div className="flex align-items-center justify-content-center md:justify-content-end gap-3 font-bold text-sm cursor-pointer w-full md:w-4">
                    {!username ? (
                        <span onClick={() => setLoginVisible(true)}>LOGIN</span>
                    ) : (
                        <>
                            <span>{username.toUpperCase()}</span>
                            <i
                                className="pi pi-sign-out"
                                style={{ fontSize: '1.2rem' }}
                                onClick={handleLogout}
                                data-pr-tooltip="Logout"
                            />
                            <Tooltip target=".pi-sign-out" />
                        </>
                    )}
                    <i className="pi pi-search" onClick={() => navigate("/search")}></i>
                    <i className="pi pi-shopping-cart" onClick={() => navigate("/cart")}></i>
                </div>
            </div>

            <Login
                visible={loginVisible}
                onHide={() => setLoginVisible(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </div>
    );
}
