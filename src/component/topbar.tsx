import { useNavigate } from "react-router-dom";

export default function TopBar() {
    const navigate = useNavigate();

    return (
        <div className="relative surface-100 border-bottom px-4 py-3">
            <div className="flex items-center justify-content-between mr-8 ml-6">
                <div className="flex gap-4 font-bold text-md mt-1 cursor-pointer">
                    <span onClick={() => navigate("/womens")}>WOMENS</span>
                    <span onClick={() => navigate("/kids")}>KIDS</span>
                    <span onClick={() => navigate("/sale")}>SALE</span>
                    <span onClick={() => navigate("/blog")}>BLOG</span>
                    <span onClick={() => navigate("/contact")}>CONTACT</span>
                </div>

                <img
                    src="/logos/Auro_o_fashion_01.png"
                    alt="Auroo Fashion Logo"
                    className="mx-auto mr-8 cursor-pointer"
                    style={{ width: '150px', height: '50px' }}
                    onClick={() => navigate("/")}
                />

                <div className="flex gap-4 font-bold text-md mr-6 mt-1 cursor-pointer">
                    <span onClick={() => navigate("/login")}>LOGIN</span>
                    <i className="pi pi-search" onClick={() => navigate("/search")}></i>
                    <i className="pi pi-shopping-cart" onClick={() => navigate("/cart")}></i>
                </div>
            </div>
        </div>
    );
}