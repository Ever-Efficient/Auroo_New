import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./login";
import { Tooltip } from 'primereact/tooltip'; // Optional for hover hint

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
        <div className="surface-100 border-bottom px-2 py-3">
            <div className="flex items-center justify-content-center text-center justify-content-between mr-8 ml-6">
                <div className="flex gap-4 font-bold text-md mt-3 cursor-pointer ml-5">
                    <span onClick={() => navigate("/")}>HOME</span>
                    <span onClick={() => navigate("/womens")}>WOMENS</span>
                    <span onClick={() => navigate("/kids")}>KIDS</span>
                    <span onClick={() => navigate("/sale")}>SALE</span>
                    <span onClick={() => navigate("/blog")}>BLOG</span>
                    <span onClick={() => navigate("/contact")}>CONTACT</span>
                </div>

                <img
                    src="/logos/Auro_o_fashion_01.png"
                    alt="Auroo Fashion Logo"
                    className="mr-8 cursor-pointer"
                    style={{ width: '150px', height: '50px' }}
                    onClick={() => navigate("/")}
                />

                <div className="flex gap-4 font-bold text-md mr-6 mt-3 cursor-pointer align-items-center">
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
                    <i className="pi pi-search mt-1" onClick={() => navigate("/search")}></i>
                    <i className="pi pi-shopping-cart mt-1" onClick={() => navigate("/cart")}></i>
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
