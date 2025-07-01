import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { products } from '../data/womensProduct';
import TopBar from "../component/topbar";
import Footer from "../component/footer";

interface Product {
    originalPrice: any;
    id: string;
    name: string;
    price: number | string,
    image: string;
    category: string;
    size?: string;
    color?: string;
    discount?: string;
}

export default function SearchResults() {
    const location = useLocation();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const query = new URLSearchParams(location.search).get("query")?.toLowerCase() ?? "";
    const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

    const handleSizeSelect = (productId: string, size: string) => {
        setSelectedSizes((prev) => ({
            ...prev,
            [productId]: size
        }));
    };

    useEffect(() => {
        const results = products
            .filter((product) =>
                product.name.toLowerCase().includes(query)
            )
            .map((product) => ({
                ...product,
                price: typeof product.price === "string" ? Number(product.price) : product.price,
                category: product.category ?? "",
            }));
        setFilteredProducts(results);
    }, [query]);

    return (
        <>
        <TopBar />
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Search Results for "{query}"</h2>

            {filteredProducts.length === 0 ? (
                <p className="text-center text-500 text-sm">No products found.</p>
            ) : (
                <div className="grid">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="col-12 sm:col-6 md:col-4 lg:col-3">
                            <Card key={product.id} style={{ width: '350px', minWidth: '250px' }}>
                                <Link to={`/product/${product.id}`} state={{ product }}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{ width: '100%', height: '25rem', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer' }} />
                                    <div className="p-2" style={{ fontSize: '12px' }}>
                                        <p style={{ fontWeight: '600', textTransform: 'uppercase', color: '#1f2937', marginTop: '0.5rem' }}>{product.name}</p>
                                        <div className="flex align-items-center gap-2 mt-1">
                                            <span
                                                style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '12px' }}>Rs
                                                {product.originalPrice.toLocaleString()}
                                            </span>
                                            <span
                                                style={{ fontWeight: 'bold', fontSize: '14px', color: '#000' }}>Rs
                                                {product.price.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            {Array.isArray(product.color) && product.color.map((color, i) => (
                                                <div
                                                    key={i}
                                                    style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ccc', backgroundColor: color }} />
                                            ))}
                                            {typeof product.color === "string" && (
                                                <div
                                                    style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ccc', backgroundColor: product.color }} />
                                            )}
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            {Array.isArray(product.size) && product.size.map((size: string) => (
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
                                                    onClick={() => handleSizeSelect(product.id, size)} />
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <Footer />
        </>
    );
}