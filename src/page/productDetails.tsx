import { useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import { Rating } from "primereact/rating";
import TopBar from "../component/topbar";
import Footer from "../component/footer";
import Reviews from "../component/Review";
import { useCart } from "../context/cartContext";
import { useEffect, useState } from "react";

export default function ProductView() {
    const { state } = useLocation();
    const product = state?.product;
    const { addToCart } = useCart();
    const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!product) {
        return <div className="text-center mt-6">Product not found. Go back to <a href="/womens" className="text-blue-500">Womens</a></div>;
    }

    const addToCartHandler = (product: any) => {
        const price = typeof product.price === 'string'
            ? Number(product.price.replace(/[^0-9.]/g, ""))
            : Number(product.price);

        const originalPrice = typeof product.oldPrice === 'string'
            ? Number(product.oldPrice.replace(/[^0-9.]/g, ""))
            : Number(product.oldPrice ?? product.price);

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
        <main className="flex flex-column min-h-screen">
            <TopBar />

            <div className="flex flex-column md:flex-row gap-6 p-4 max-w-6xl mx-auto mt-4">
                <div className="relative w-full md:w-6 md:ml-7">
                    <Image
                        src={product.image}
                        alt={product.name}
                        imageClassName="w-full border-round-xl object-cover"
                        preview
                    />
                </div>

                <div className="flex flex-column justify-content-between w-full md:w-6 md:mr-6 mt-4 md:mt-0">
                    <div>
                        <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
                        <div className="flex align-items-center gap-2 text-sm text-500">
                            <Rating value={5} readOnly cancel={false} />
                            <span>(5 Reviews)</span>
                        </div>

                        <div className="mt-4 text-lg font-bold">
                            <span className="line-through mr-2 text-400">Rs {product.originalPrice}</span>
                            <span className="text-red-600">Rs {product.price}</span>
                        </div>

                        <div className="flex gap-2 mt-4 flex-wrap">
                            {product.colors.map((color: any, i: any) => (
                                <div
                                    key={i}
                                    style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ccc', backgroundColor: color }}
                                />
                            ))}
                        </div>

                        <div className="flex gap-2 mt-4 flex-wrap">
                            {product.sizes.map((size: string) => (
                                <Button
                                    key={size}
                                    label={size}
                                    size="small"
                                    severity={selectedSizes[product.id] === size ? "secondary" : "secondary"}
                                    outlined={selectedSizes[product.id] !== size}
                                    style={{
                                        fontSize: '15px',
                                        padding: '0.25rem 0.5rem',
                                        height: '40px',
                                        width: '50px',
                                        borderColor: selectedSizes[product.id] === size ? '#FFE1E2' : '#000000',
                                        backgroundColor: selectedSizes[product.id] === size ? '#000000' : undefined,
                                        color: selectedSizes[product.id] === size ? '#fff' : undefined
                                    }}
                                    onClick={() => handleSizeSelect(product.id, size)}
                                />
                            ))}
                        </div>

                        <Button
                            label="ADD TO BAG"
                            className="w-full mt-4 p-button-sm"
                            style={{
                                backgroundColor: isHovered ? '#FFE1E2' : '#000000',
                                color: isHovered ? '#000000' : '#FFE1E2',
                                border: '1px solid black',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => addToCartHandler(product)}
                        />

                        <div className="mt-5 text-sm text-700">
                            <div className="flex align-items-center gap-3">
                                <img src="https://cdn-icons-png.flaticon.com/512/71/71222.png" className="w-2rem" alt="Shipping" />
                                <span>Free Shipping on all U.S. orders over $100</span>
                            </div>
                            <div className="flex align-items-center gap-3 mt-3">
                                <img src="https://cdn-icons-png.flaticon.com/512/150/150519.png" className="w-2rem" alt="Returns" />
                                <span>Easy Returns through January 31</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Divider className="my-5" />
            <div className="flex justify-content-center px-3 md:px-6">
                <div className="w-full max-w-6xl">
                    <Reviews />
                </div>
            </div>
            <Footer />
        </main>
    );
}