import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import TopBar from '../component/topbar';
import Footer from '../component/footer';
import { useState } from 'react';
import { useCart } from '../context/cartContext';
import { Paginator } from 'primereact/paginator';

const products = [
    {
        id: 'W1',
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "Rs 10,999.00",
        originalPrice: "Rs 18,999.00",
        image: "/images/product1.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
    {
        id: 'W2',
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "Rs 10,999.00",
        originalPrice: "Rs 18,999.00",
        image: "/images/product2.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
    {
        id: 'W3',
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "Rs 10,999.00",
        originalPrice: "Rs 18,999.00",
        image: "/images/product3.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
    {
        id: 'W4',
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "Rs 10,999.00",
        originalPrice: "Rs 18,999.00",
        image: "/images/product4.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
    {
        id: 'W5',
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "Rs 10,999.00",
        originalPrice: "Rs 18,999.00",
        image: "/images/product5.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
    {
        id: 'W6',
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "Rs 10,999.00",
        originalPrice: "Rs 18,999.00",
        image: "/images/product6.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
    {
        id: 'W7',
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "Rs 10,999.00",
        originalPrice: "Rs 18,999.00",
        image: "/images/product7.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
    {
        id: 'W8',
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "Rs 10,999.00",
        originalPrice: "Rs 18,999.00",
        image: "/images/product8.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
    {
        id: 'W9',
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "Rs 10,999.00",
        originalPrice: "Rs 18,999.00",
        image: "/images/product9.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
    {
        id: 'W10',
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "Rs 10,999.00",
        originalPrice: "Rs 18,999.00",
        image: "/images/product10.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
    {
        id: 'W11',
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "Rs 10,999.00",
        originalPrice: "Rs 18,999.00",
        image: "/images/product11.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
    {
        id: 'W12',
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "Rs 10,999.00",
        originalPrice: "Rs 18,999.00",
        image: "/images/product12.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
    {
        id: 'W13',
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "Rs 10,999.00",
        originalPrice: "Rs 18,999.00",
        image: "/images/product13.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
    {
        id: 'W14',
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "Rs 10,999.00",
        originalPrice: "Rs 18,999.00",
        image: "/images/product14.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
    {
        id: 'W15',
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "Rs 10,999.00",
        originalPrice: "Rs 18,999.00",
        image: "/images/product15.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
    {
        id: 'W16',
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "Rs 10,999.00",
        originalPrice: "Rs 18,999.00",
        image: "/images/product16.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#5B1E1E", "#EAD6D6", "#F3E1DC"]
    },
];

export default function SalePage() {

    const [first, setFirst] = useState(0);
    const rows = 12;
    const { addToCart } = useCart();

    const addToCartHandler = (product: any) => {
        const price = Number(product.price.replace(/[^0-9.]/g, ""));
        const originalPrice = Number(product.originalPrice.replace(/[^0-9.]/g, ""));

        const cartItem = {
            id: product.id,
            name: product.name,
            size: product.sizes[0],
            color: product.colors[0],
            price,
            originalPrice,
            discount: `${Math.round(((originalPrice - price) / originalPrice) * 100)}%`,
            quantity: 1,
            image: product.image
        };
        addToCart(cartItem);
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
                                            style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1px solid #ccc', backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                                <div className="flex gap-2 mt-2">
                                    {product.sizes.map((size) => (
                                        <Button
                                            key={size}
                                            label={size}
                                            size="small"
                                            severity="secondary"
                                            outlined
                                            style={{ fontSize: '10px', padding: '0.25rem 0.5rem', height: '2rem' }}
                                        />
                                    ))}
                                </div>
                                <Button
                                    label="ADD TO CART"
                                    size="small"
                                    severity="contrast"
                                    className="mt-3"
                                    rounded
                                    style={{ width: '100%', fontSize: '12px', marginTop: '0.75rem' }}
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
