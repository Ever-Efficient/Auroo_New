import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import TopBar from '../component/topbar';
import Footer from '../component/footer';
import { useState } from 'react';
import { useCart } from '../context/cartContext';
import { Paginator } from 'primereact/paginator';
import { products } from '../data/womensProduct';

export default function SalePage() {

    const [first, setFirst] = useState(0);
    const rows = 12;
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


    interface PageChangeEvent {
        first: number;
        rows: number;
        page: number;
        pageCount: number;
    }

    const onPageChange = (e: PageChangeEvent) => {
        setFirst(e.first);
    };

    const paginatedProducts = products.slice(first, first + rows);

    return (
        <div className="flex flex-column min-h-screen">
            <TopBar />
            <div className="px-4 py-2 flex justify-content-between align-items-center border-bottom-1 border-300 mr-8 ml-6 mt-3">
                <div className="flex align-items-center gap-2">
                    <i className="pi pi-sliders-h"></i>
                    <span className="font-medium">FILTER & SORT</span>
                </div>
                <span className="text-sm">{products.length} PRODUCTS</span>

            </div>

            <div className="flex-1 p-4">
                <div className="flex flex-wrap justify-content-center gap-3 mr-5">
                    {paginatedProducts.map((product) => (
                        <Card key={product.id} style={{ width: '300px', minWidth: '200px' }}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: '100%', height: '25rem', objectFit: 'cover', borderRadius: '6px' }}
                            />
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
                                    style={{ width: '65%', fontSize: '12px', marginTop: '0.75rem', background: '#000000' }}
                                    onClick={() => addToCartHandler(product)}
                                />
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-content-center mt-5 mb-4">
                    <Paginator first={first} rows={rows} totalRecords={products.length} onPageChange={onPageChange} />
                </div>
                <Footer />
            </div>
        </div>
    );
}
