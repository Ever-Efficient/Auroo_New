import { Link } from "react-router-dom";

export default function TopBar() {
    return (
        <div className="relative surface-100 border-bottom px-4 py-3">
            <div className="flex items-center justify-content-between mr-8 ml-6">
                <div className="flex gap-4 font-bold text-md mt-1">
                    <Link to="/womens">WOMENS</Link>
                    <Link to="/kids">KIDS</Link>
                    <Link to="/sale">SALE</Link>
                    <Link to="/blog">BLOG</Link>
                    <Link to="/contact">CONTACT</Link>
                </div>

                <img
                    src="/logos/Auro_o_fashion_01.png"
                    alt="Auroo Fashion Logo"
                    className="mx-auto mr-8"
                    style={{ width: '100px', height: 'auto' }}
                />

                <div className="flex gap-4 font-bold text-md mr-6 mt-1">
                    <Link to="/login">LOGIN</Link>
                    <Link to="/search">
                        <i className="pi pi-search"></i>
                    </Link>
                    <Link to="/cart">
                        <i className="pi pi-shopping-cart"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
}
