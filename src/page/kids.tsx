import React, { useState } from "react";
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

const products = [
    {
        id: 'K01',
        name: "",
        price: "",
        originalPrice: "",
        image: "",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
    {
        id: 'K02',
        name: "",
        price: "",
        originalPrice: "",
        image: "",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },

];

const Kids = () => {
    const [first, setFirst] = useState(0);
    const rows = 12;
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
    const { addToCart } = useCart();
    const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});


    const addToCartHandler = (product: any) => {
        const price = Number(product.price.replace(/[^0-9.]/g, ""));
        const originalPrice = Number(product.originalPrice.replace(/[^0-9.]/g, ""));
        const selectedSize = selectedSizes[product.id] || product.sizes[0];

        const cartItem = {
            id: product.id,
            name: product.name,
            size: selectedSize,
            color: product.colors[0],
            price,
            originalPrice,
            discount: `${Math.round(((originalPrice - price) / originalPrice) * 100)}%`,
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


    const filteredProducts = products.filter(product => {
        const priceNum = Number(product.price.replace(/[^0-9.]/g, ""));
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

    const paginatedProducts = filteredProducts.slice(first, first + rows);

    return (
        <>
            <TopBar />
            <div className="flex flex-column md:flex-row">
                {/* Sidebar */}
                <div className="p-4 shadow-0 surface-50 ml-6 mt-4" style={{ width: "250px" }}>
                    <h5>PRICE RANGE</h5>
                    <div className="mb-4">
                        <Slider
                            value={priceRange}
                            onChange={(e) => {
                                if (Array.isArray(e.value) && e.value.length === 2) {
                                    setPriceRange(e.value as [number, number]);
                                }
                            }}
                            range
                            min={0}
                            max={20000}
                            step={100}
                            className="w-full"
                        />
                        <div className="flex justify-content-between mt-2">
                            <span>Rs {priceRange[0].toLocaleString()}</span>
                            <span>Rs {priceRange[1].toLocaleString()}</span>
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
                        placeholder="Select"
                        options={[
                            { label: "Price Low to High", value: "low" },
                            { label: "High to Low", value: "high" }
                        ]}
                        className="w-full"
                    />
                </div>

                {/* Products Section */}
                <div className="flex-1 p-4">
                    <div className="flex flex-wrap justify-content-center gap-3 mr-5">
                        {paginatedProducts.map((product) => (
                            <Card key={product.id} style={{ width: '350px', minWidth: '250px' }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{
                                        width: '100%',
                                        height: '25rem',
                                        objectFit: 'cover',
                                        borderRadius: '6px'
                                    }}
                                />
                                <div className="p-2" style={{ fontSize: '12px' }}>
                                    <p style={{ fontWeight: '600', textTransform: 'uppercase', color: '#1f2937', marginTop: '0.5rem' }}>
                                        {product.name}
                                    </p>

                                    <div className="flex align-items-center gap-2 mt-1">
                                        <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '12px' }}>
                                            {product.originalPrice}
                                        </span>
                                        <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#000' }}>
                                            {product.price}
                                        </span>
                                    </div>

                                    <div className="flex gap-2 mt-2">
                                        {product.colors.map((color, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    width: '16px',
                                                    height: '16px',
                                                    borderRadius: '50%',
                                                    border: '1px solid #ccc',
                                                    backgroundColor: color
                                                }}
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
                                                    height: '2rem',
                                                    borderColor: selectedSizes[product.id] === size ? '#000' : undefined,
                                                    backgroundColor: selectedSizes[product.id] === size ? '#e5e5e5' : undefined,
                                                }}
                                                onClick={() => handleSizeSelect(product.id, size)}
                                            />
                                        ))}
                                    </div>


                                    <Button
                                        label="ADD TO CART"
                                        size="small" severity="contrast"
                                        className="mt-3"
                                        rounded
                                        style={{ width: '100%', fontSize: '12px', marginTop: '0.75rem' }}
                                        onClick={() => addToCartHandler(product)}
                                    />
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="flex justify-content-center mt-5">
                        <Paginator
                            first={first}
                            rows={rows}
                            totalRecords={filteredProducts.length}
                            onPageChange={onPageChange}
                        />
                    </div>
                </div>
            </div>

            {/* Newsletter */}
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
                        <InputText
                            placeholder="Your email address"
                            className="p-inputtext-sm w-20rem text-center"
                            style={{ borderRadius: '25rem' }}
                        />
                        <Button
                            label="SUBSCRIBE"
                            className="p-button-sm p-button-secondary"
                            style={{ background: 'black', borderRadius: '25rem' }}
                        />
                    </div>
                </div>
            </div>

            <Divider />

            <Footer />
        </>
    );
};

export default Kids;