import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import TopBar from '../component/topbar';
import Footer from '../component/footer';
import { useState } from 'react';
import { useCart } from '../context/cartContext';
import { Paginator } from 'primereact/paginator';
import { products } from '../data/womensProduct';
import { Link } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';

export default function SalePage() {

    const [first, setFirst] = useState(0);
    const rows = 12;
    const { addToCart } = useCart();
    const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
    const [sortOption, setSortOption] = useState<string>("");
    const [priceRange] = useState<[number, number]>([0, 20000]);
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
            color: product.colors,
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

    interface PageChangeEvent {
        first: number;
        rows: number;
        page: number;
        pageCount: number;
    }

    const onPageChange = (e: PageChangeEvent) => {
        setFirst(e.first);
    };

    const filteredProducts = products.filter((product: { price: string | number }) => {
        const price = typeof product.price === "string"
            ? Number(product.price.replace(/[^0-9.]/g, ""))
            : Number(product.price);
        return price >= priceRange[0] && price <= priceRange[1];
    });

    const sortedProducts = [...filteredProducts].sort((a: { price: string | number }, b: { price: string | number }) => {
        const priceA = typeof a.price === "string"
            ? Number(a.price.replace(/[^0-9.]/g, ""))
            : Number(a.price);
        const priceB = typeof b.price === "string"
            ? Number(b.price.replace(/[^0-9.]/g, ""))
            : Number(b.price);

        if (sortOption === "low") return priceA - priceB;
        if (sortOption === "high") return priceB - priceA;
        return 0;
    });

    const paginatedProducts = sortedProducts.slice(first, first + rows);

    return (
        <div className="flex flex-column min-h-screen">
            <TopBar />
            <div className="px-4 py-3 flex flex-column md:flex-row justify-content-between align-items-start md:align-items-center border-bottom-1 border-300 gap-3 mt-3 mb-3 mx-3">
                {/* Sort Section */}
                <div className="flex align-items-center gap-2">
                    <label className="text-sm font-medium white-space-nowrap">Sort By:</label>
                    <Dropdown
                        value={sortOption}
                        onChange={(e) => setSortOption(e.value)}
                        options={[
                            { label: 'Price Low to High', value: 'low' },
                            { label: 'Price High to Low', value: 'high' }
                        ]}
                        placeholder="Select"
                        className="w-15rem"
                    />
                </div>

                {/* Product Count */}
                <span className="text-sm">{products.length} PRODUCTS</span>
            </div>

            <div>
                <div className="flex flex-wrap justify-content-center gap-3">
                    {paginatedProducts.map((product) => (
                        <Card key={product.id} style={{ width: '300px', minWidth: '200px' }}>
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
                                <div className="flex gap-2">
                                    <div className="text-lg font-bold">{product.colors}</div>
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
                <div className="flex justify-content-center mt-5 mb-4">
                    <Paginator first={first} rows={rows} totalRecords={products.length} onPageChange={onPageChange} />
                </div>
                <Footer />
            </div>
        </div>
    );
}
