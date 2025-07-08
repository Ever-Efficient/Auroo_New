import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { useRef, useState } from 'react';
import { Image } from 'primereact/image';
import { Toast } from 'primereact/toast';
import { useCart } from "../context/cartContext";
import { Card } from 'primereact/card';
import Footer from '../component/footer';
import TopBar from '../component/topbar';
import { Divider } from 'primereact/divider';
import { products } from '../data/womensProduct';
import { Link } from 'react-router-dom';

export default function Cart() {
    const [checked, setChecked] = useState(false);
    const toast = useRef<Toast>(null);
    const { cartItems, updateQuantity, addToCart, removeFromCart } = useCart();
    const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);


    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const addToCartHandler = (product: any) => {
        const price = Number(product.price.replace(/[^0-9.]/g, ""));
        const originalPrice = Number((product.oldPrice ?? product.price).replace(/[^0-9.]/g, ""));
        const selectedSize = selectedSizes[product.id] || product.sizes[0];

        const discountPercentage = originalPrice > price
            ? `${Math.round(((originalPrice - price) / originalPrice) * 100)}%`
            : "0%";

        const cartItem = {
            id: product.id,
            name: product.name,
            size: selectedSize,
            color: product.colors?.[0] ?? '#000000',
            price,
            originalPrice,
            discount: discountPercentage,
            quantity: 1,
            image: product.image
        };

        addToCart(cartItem);
    };

    const handleSizeSelect = (productId: string, size: string) => {
        setSelectedSizes((prev) => ({
            ...prev,
            [productId]: size
        }));
    };

    return (
        <div>
            <TopBar />
            <Toast ref={toast} />
            <div className="flex flex-column justify-content-between mt-4 px-3 md:px-6">
                <div className="grid justify-content-center gap-4">

                    <div className="col-12 md:col-11 flex justify-content-between px-3 py-2 border-bottom-1 surface-border text-sm font-semibold text-color-secondary">
                        <div className="flex-2">Item</div>
                        <div className="flex-1 text-center">Quantity</div>
                        <div className="flex-1 text-right">Total</div>
                    </div>

                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="col-12 md:col-10 surface-card p-3 border-round shadow-2 flex flex-column md:flex-row align-items-start md:align-items-center justify-content-between gap-4"
                        >
                            <div className="flex gap-3 align-items-start md:align-items-center flex-2">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width="80"
                                    height="100"
                                    className="border-round"
                                />
                                <div>
                                    <div className="text-sm font-bold mb-1">{item.name}</div>
                                    <div className="text-xs text-color-secondary mb-1">{item.size} | {item.color}</div>
                                    <div className="text-xs text-color-secondary line-through mb-1">
                                        RS {item.originalPrice.toFixed(2)}
                                    </div>
                                    <div className="text-sm font-bold mb-1">RS {item.price.toFixed(2)}</div>
                                    <div className="text-xs text-pink-500 font-bold">({item.discount})</div>
                                </div>
                            </div>

                            <div className="flex align-items-center gap-3 justify-content-center md:ml-8 mt-3 md:mt-0 flex-1">
                                <Button icon="pi pi-minus" size="small" className="surface-border" text onClick={() => updateQuantity(item.id, item.size, item.color, -1)} />
                                <span className="text-base font-medium">{item.quantity}</span>
                                <Button icon="pi pi-plus" size="small" className="surface-border" text onClick={() => updateQuantity(item.id, item.size, item.color, 1)} />
                                <Button icon="pi pi-trash" size="small" severity="danger" text onClick={() => removeFromCart(item.id, item.size, item.color)} tooltip="Remove item" />
                            </div>

                            <div className="text-left md:text-right mt-3 md:mt-0 flex-1">
                                <div className="text-xs text-color-secondary">Total</div>
                                <div className="text-lg font-bold">RS {(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 px-3 md:px-6">
                    <Divider />
                    <div className="flex flex-column sm:flex-row justify-content-between text-sm mb-1 gap-2">
                        <span className="text-xl">Subtotal ({cartItems.length} items)</span>
                        <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>RS {calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-color-secondary mb-3">
                        Taxes and shipping calculated at checkout
                    </div>
                    <Divider />
                    <div className="flex align-items-center gap-2 mb-3">
                        <Checkbox inputId="agree" checked={checked} onChange={e => setChecked(e.checked ?? false)} />
                        <label htmlFor="agree" className="text-md mb-1">I agree with the terms and conditions.</label>
                    </div>
                    <div className="flex justify-content-center mb-2">
                        <Button
                            label="CHECKOUT"
                            disabled={!checked}
                            style={{ background: 'black', width: '100%', maxWidth: '300px' }}
                            onClick={() => checked && alert("Proceeding to checkout...")}
                        />
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="text-center">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>YOU MAY ALSO LIKE</h2>
                </div>
                <div className="flex flex-wrap justify-content-center gap-2">
                    {products.slice(11, 15).map((product) => (
                        <Card
                            key={product.id}
                            className="relative"
                            style={{ width: '310px', minWidth: '190px' }}
                        >
                            <Link to={`/product/${product.id}`} state={{ product }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '100%', height: '25rem', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer' }}
                                />
                            </Link>
                            <div className="p-2" style={{ fontSize: '12px' }}>
                                <p style={{ fontWeight: '600', textTransform: 'uppercase', color: '#1f2937', marginTop: '0.5rem' }}>
                                    {product.name}
                                </p>
                                <div className="flex align-items-center gap-2 mt-1">
                                    {product.originalPrice && (
                                        <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '12px' }}>
                                            Rs {product.originalPrice}
                                        </span>
                                    )}
                                    <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#000' }}>
                                        Rs {product.price}
                                    </span>
                                </div>
                                <p
                                    style={{
                                        fontSize: '10px',
                                        color: '#6b7280',
                                        marginTop: '0.25rem',
                                        lineHeight: '1.2',
                                        width: '200px',
                                        minHeight: '2.4em',
                                        whiteSpace: 'normal',
                                        wordBreak: 'break-word',
                                        textAlign: 'left',
                                    }}
                                >
                                    <span>3 x Rs 6,333 or 4.5% cashback with or pay 3 x Rs 6,333 with</span>
                                </p>

                                <div className="flex gap-2 mt-2">
                                    {product.colors.map((color, i) => (
                                        <div
                                            key={i}
                                            style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ccc', backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                                <div className="flex gap-2 mt-2">
                                    {product.sizes.map((size: string) => (
                                        <Button
                                            key={size}
                                            label={size}
                                            size="small"
                                            severity={selectedSizes[product.id] === size ? "secondary" : "secondary"}
                                            outlined={selectedSizes[product.id] !== size}
                                            style={{
                                                fontSize: '10px',
                                                padding: '0.25rem 0.5rem',
                                                height: '30px',
                                                width: '40px',
                                                borderColor: selectedSizes[product.id] === size ? '#FFE1E2' : '#000000',
                                                backgroundColor: selectedSizes[product.id] === size ? '#000000' : undefined,
                                            }}
                                            onClick={() => handleSizeSelect(product.id, size)}
                                        />
                                    ))}
                                </div>

                                <Button
                                    label="ADD TO CART"
                                    size="small"
                                    severity="contrast"
                                    className="mt-3"
                                    rounded
                                    style={{
                                        width: '65%',
                                        fontSize: '12px',
                                        marginTop: '0.75rem',
                                        backgroundColor: hoveredProductId === product.id ? '#FFE1E2' : '#000000',
                                        color: hoveredProductId === product.id ? '#000000' : '#FFE1E2',
                                        transition: 'all 0.3s ease',
                                        border: '1px solid black',
                                    }}
                                    onMouseEnter={() => setHoveredProductId(product.id)}
                                    onMouseLeave={() => setHoveredProductId(null)}
                                    onClick={() => addToCartHandler(product)}
                                />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}