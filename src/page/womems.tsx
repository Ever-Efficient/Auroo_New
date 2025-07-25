import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Paginator } from "primereact/paginator";
import { Slider } from "primereact/slider";
import { useCart } from "../context/cartContext";
import TopBar from "../component/topbar";
import Footer from "../component/footer";
import { products } from "../data/womensProduct";
import { Link } from "react-router-dom";


const Womens = () => {
    const [first, setFirst] = useState(0);
    const rows = 12;
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
    const { addToCart } = useCart();
    const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
    const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
    const [sortOption, setSortOption] = useState<string>("");
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

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

    const handleColorSelect = (productId: string, color: string) => {
        setSelectedColors((prev) => ({
            ...prev,
            [productId]: color
        }));
    };

    const filteredProducts = products.filter(product => {
        const priceNum = Number(String(product.price).replace(/[^0-9.]/g, ""));
        return priceNum >= priceRange[0] && priceNum <= priceRange[1];
    });

    interface PageChangeEvent {
        first: number;
        rows: number;
        page: number;
        pageCount: number;
    }

    const onPageChange = (e: PageChangeEvent) => {
        setFirst(e.first);
    };

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const priceA = Number(String(a.price).replace(/[^0-9.]/g, ""));
        const priceB = Number(String(b.price).replace(/[^0-9.]/g, ""));

        if (sortOption === "low") {
            return priceA - priceB;
        } else if (sortOption === "high") {
            return priceB - priceA;
        }
        return 0;
    });

    const paginatedProducts = sortedProducts.slice(first, first + rows);

    return (
        <>
            <TopBar />
            <div className="p-fluid flex flex-column md:flex-row">
                <div className="p-4 shadow-0 surface-50 ml-3 mt-4" style={{ width: "250px" }}>
                    <h5>PRICE RANGE</h5>
                    <div className="relative mb-4">
                        <Slider
                            value={priceRange[1]}
                            onChange={(e) => {
                                if (typeof e.value === 'number') {
                                    setPriceRange([0, e.value]);
                                }
                            }}
                            min={0}
                            max={20000}
                            step={100}
                            className="w-full"
                            pt={{
                                range: {
                                    style: {
                                        backgroundColor: '#FFB3BC'
                                    }
                                },
                                handle: {
                                    style: {
                                        borderColor: '#FFB3BC',
                                        backgroundColor: '#FFB3BC'
                                    }
                                }
                            }}
                        />

                        <div
                            className="absolute -top-6 text-xs font-bold px-2 py-1 rounded mt-2"
                            style={{
                                backgroundColor: '#000000',
                                color: '#FFE1E2',
                                transform: 'translateX(-50%)',
                                width: '80px',
                                borderRadius: '25rem',
                                left: `${(priceRange[1] / 20000) * 100}%`
                            }}
                        >
                            Rs {priceRange[1].toLocaleString()}
                        </div>
                    </div>

                    <h5>AVAILABILITY</h5>
                    <Dropdown
                        placeholder="Select"
                        options={[
                            { label: "In Stock", value: "in" },
                            { label: "Out of Stock", value: "out" }
                        ]}
                        className="mb-3 w-full"
                    />

                    <h5>SORT BY</h5>
                    <Dropdown
                        value={sortOption}
                        onChange={(e) => setSortOption(e.value)}
                        placeholder="Select"
                        options={[
                            { label: "Price Low to High", value: "low" },
                            { label: "Price High to Low", value: "high" }
                        ]}
                        className="w-full"
                    />
                </div>

                <div className="flex-1 p-4">
                    <div className="flex flex-wrap justify-content-center gap-3 mr-5">
                        {paginatedProducts.map((product) => (
                            <Card key={product.id} style={{ width: '350px', minWidth: '250px' }}>
                                <Link to={`/product/${product.id}`} state={{ product }}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{ width: '100%', height: '25rem', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer' }}
                                    />
                                </Link>
                                <div className="p-2" style={{ fontSize: '12px' }}>
                                    <p style={{ fontWeight: '600', textTransform: 'uppercase', color: '#1f2937', marginTop: '0.5rem' }}>{product.name}</p>
                                    <div className="flex align-items-center gap-2 mt-1">
                                        <span
                                            style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '12px' }}>Rs.
                                            {product.originalPrice.toLocaleString()}
                                        </span>
                                        <span
                                            style={{ fontWeight: 'bold', fontSize: '14px', color: '#000' }}>Rs.
                                            {product.price.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        {product.colors.map((color: any, i: any) => {
                                            const isSelected = selectedColors[product.id] === color;
                                            return (
                                                <div
                                                    key={i}
                                                    onClick={() => handleColorSelect(product.id, color)}
                                                    style={{
                                                        width: '30px',
                                                        height: '30px',
                                                        borderRadius: '50%',
                                                        border: isSelected ? '2px solid black' : '1px solid #ccc',
                                                        backgroundColor: color,
                                                        cursor: 'pointer',
                                                        boxShadow: isSelected ? '0 0 0 2px #FFE1E2' : 'none',
                                                    }}
                                                />
                                            );
                                        })}
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
                                                    borderColor: selectedSizes[product.id] === size ? '#000' : undefined,
                                                    backgroundColor: selectedSizes[product.id] === size ? '#000' : undefined,
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

                    <div className="flex justify-content-center mt-5">
                        <Paginator first={first} rows={rows} totalRecords={filteredProducts.length} onPageChange={onPageChange} />
                    </div>
                </div>
            </div>

            <Divider className="mt-6" />
            <div className="w-full" style={{ backgroundColor: '#F4E7E7' }}>
                <div className="flex flex-column align-items-center justify-content-center text-center py-6 px-4 max-w-screen-xl mx-auto">
                    <h3 className="font-bold" style={{ fontSize: '1.5rem', margin: 0, fontFamily: 'Aboreto' }}>
                        GET THE LATEST – DELIVERED TO YOU
                    </h3>
                    <p className="mb-4" style={{ fontFamily: 'Aboreto', fontSize: '1.2rem' }}>
                        Stay in the loop with our newest arrivals, exclusive deals, special events, and more straight to your inbox!
                    </p>
                    <div className="flex flex-column sm:flex-row gap-2">
                        <InputText placeholder="Your email address" className="p-inputtext-sm w-20rem text-center" style={{ borderRadius: '25rem' }} />
                        <Button label="SUBSCRIBE" className="p-button-sm p-button-secondary" style={{ background: 'black', borderRadius: '25rem' }} />
                    </div>
                </div>
            </div>

            <Divider />
            <Footer />
        </>
    );
};

export default Womens;