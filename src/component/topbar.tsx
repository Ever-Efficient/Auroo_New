import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./login";
import { Tooltip } from "primereact/tooltip";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Image } from "primereact/image";
import { useCart } from "../context/cartContext";

export default function TopBar() {
    const navigate = useNavigate();
    const [loginVisible, setLoginVisible] = useState(false);
    const [cartVisible, setCartVisible] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
    const [termsChecked, setTermsChecked] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLoginSuccess = (email: string) => {
        const name = email.split("@")[0];
        setUsername(name);
        setLoginVisible(false);
    };

    const handleLogout = () => {
        setUsername(null);
    };

    const baseStyle = {
        width: '100%',
        marginBottom: '0.5rem',
        fontSize: '0.875rem',
        padding: '0.5rem 1rem',
        backgroundColor: isHovered ? '#FFE1E2' : '#000000',
        color: isHovered ? '#000000' : '#FFE1E2',
        border: '1px solid black',
        transition: 'all 0.3s ease',
    };

    const boxStyle = {
        width: '18px',
        height: '18px',
        border: '2px solid black',
        backgroundColor: termsChecked ? 'black' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    };

    const tickStyle = {
        display: termsChecked ? 'block' : 'none',
        width: '12px',
        height: '12px',
        color: 'white',
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
            setSearchVisible(false);
            setSearchQuery('');
        }
    };

    return (
        <div className="surface-100 border-bottom px-3 py-3">
            <div className="flex flex-column md:flex-row align-items-center justify-content-between w-full gap-3">
                <div className="flex flex-wrap gap-3 font-bold text-sm justify-content-center md:justify-content-start w-full md:w-4">
                    {[
                        { label: "HOME", path: "/" },
                        { label: "WOMENS", path: "/womens" },
                        //{ label: "KIDS", path: "/kids" },
                        { label: "SALE", path: "/sale" },
                        { label: "CONTACT", path: "/contact" },
                    ]
                        .filter(item => !!item.path)
                        .map((item) => (
                            <span
                                key={item.path}
                                onClick={() => navigate(item.path!)}
                                className="p-2 border-round cursor-pointer transition-duration-200"
                                style={{
                                    color: '#000',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFE1E2')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = '#000')}
                            >
                                {item.label}
                            </span>
                        ))}
                </div>

                <div className="flex justify-content-center w-full md:w-4">
                    <img
                        src="/logos/Auro_o_fashion_02.png"
                        alt="Auroo Fashion Logo"
                        className="cursor-pointer"
                        style={{ width: '150px', height: '60px' }}
                        onClick={() => navigate("/")}
                    />
                </div>

                <div className="flex align-items-center justify-content-center md:justify-content-end gap-4 font-bold text-sm cursor-pointer w-full md:w-4">
                    {!username ? (
                        <span
                            onClick={() => setLoginVisible(true)}
                            className="p-2 border-round"
                            style={{ color: '#000', transition: 'all 0.3s ease' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#FFE1E2')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#000')}
                        >
                            LOGIN
                        </span>
                    ) : (
                        <>
                            <span className="p-2 border-round" style={{ color: '#000' }}>
                                {username.toUpperCase()}
                            </span>
                            <i
                                className="pi pi-sign-out p-2 border-round"
                                style={{ fontSize: '1.2rem', cursor: 'pointer', color: '#000', transition: 'all 0.3s ease' }}
                                onClick={handleLogout}
                                data-pr-tooltip="Logout"
                                onMouseEnter={e => (e.currentTarget.style.color = '#FFE1E2')}
                                onMouseLeave={e => (e.currentTarget.style.color = '#000')}
                            />
                            <Tooltip target=".pi-sign-out" />
                        </>
                    )}

                    {searchVisible && (
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="text-sm border-1 border-300 px-3 py-2"
                            style={{
                                width: '200px',
                                borderRadius: '999px',
                                outline: 'none',
                                borderColor: '#ccc',
                            }}
                        />
                    )}

                    <i
                        className="pi pi-search p-2 border-round"
                        style={{ fontSize: '1.2rem', cursor: 'pointer', color: '#000', transition: 'all 0.3s ease' }}
                        onClick={() => setSearchVisible(!searchVisible)}
                        onMouseEnter={e => (e.currentTarget.style.color = '#FFE1E2')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#000')}
                    />

                    <i
                        className="pi pi-shopping-cart p-2 border-round"
                        style={{ fontSize: '1.2rem', cursor: 'pointer', color: '#000', transition: 'all 0.3s ease' }}
                        onClick={() => setCartVisible(true)}
                        onMouseEnter={e => (e.currentTarget.style.color = '#FFE1E2')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#000')}
                    />
                </div>
            </div>

            <Login
                visible={loginVisible}
                onHide={() => setLoginVisible(false)}
                onLoginSuccess={handleLoginSuccess}
            />

            <Sidebar
                visible={cartVisible}
                position="right"
                onHide={() => setCartVisible(false)}
                className="w-full sm:w-30rem"
            >
                <div className="flex flex-column h-full justify-between">
                    <div className="overflow-y-auto p-4" style={{ flexGrow: 1, maxHeight: 'calc(100vh - 230px)' }}>
                        <h2 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>YOUR CART</h2>
                        {cartItems.length === 0 ? (
                            <p className="text-center text-sm text-500">Your cart is empty.</p>
                        ) : (
                            cartItems.map(item => (
                                <div key={item.id} className="flex mb-4">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width="80"
                                        height="100"
                                        className="border-round mr-3"
                                    />
                                    <div className="flex flex-column justify-content-between w-full">
                                        <div>
                                            <div className="font-medium text-sm mb-1">{item.name}</div>
                                            <div className="text-sm text-500 mb-1">{item.size} | {item.color}</div>
                                            <div className="line-through text-sm text-500">RS {item.originalPrice.toLocaleString('en-IN')}.00</div>
                                            <div className="text-md font-bold">RS {item.price.toLocaleString('en-IN')}.00</div>
                                            <div className="text-red-500 text-sm">({item.discount} Off)</div>
                                        </div>
                                        <div className="flex align-items-center justify-content-between">
                                            <div className="flex align-items-center gap-3 justify-content-center md:ml-8 mt-3 md:mt-0 flex-1">
                                                <Button icon="pi pi-minus" size="small" className="surface-border" text onClick={() => updateQuantity(item.id, -1)} />
                                                <span className="text-base font-medium">{item.quantity}</span>
                                                <Button icon="pi pi-plus" size="small" className="surface-border" text onClick={() => updateQuantity(item.id, 1)} />
                                                <Button icon="pi pi-trash" size="small" severity="danger" text onClick={() => removeFromCart(item.id)} tooltip="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-4 border-top-1 surface-border shadow-3">
                        <div className="flex justify-content-between mb-2 text-sm">
                            <span>Subtotal ({cartItems.length} items)</span>
                            <span>RS {subtotal.toLocaleString('en-IN')}.00</span>
                        </div>
                        <div className="text-xs text-500 mb-4">Taxes and shipping calculated at checkout</div>
                        <div className="flex align-items-center mb-4">
                            <label htmlFor="terms" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <div style={boxStyle}>
                                    {termsChecked && (
                                        <svg
                                            style={tickStyle}
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6 10.8L3.2 8L2 9.2L6 13.2L14 5.2L12.8 4L6 10.8Z"
                                                fill="white"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <Checkbox
                                    inputId="terms"
                                    checked={termsChecked}
                                    onChange={e => setTermsChecked(e.checked ?? false)}
                                    style={{ display: 'none' }}
                                />
                                <span className="ml-2">I agree with the terms and conditions.</span>
                            </label>
                        </div>
                        <Button
                            label="CONTINUE TO CHECKOUT"
                            disabled={!termsChecked}
                            style={{ ...baseStyle }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="p-button-sm"
                        />
                        <Button
                            label="VIEW CART"
                            style={{ color: '#000000' }}
                            className="w-full p-button-text p-button-sm text-sm"
                            onClick={() => navigate('/cart')}
                        />
                    </div>
                </div>
            </Sidebar>
        </div>
    );
}