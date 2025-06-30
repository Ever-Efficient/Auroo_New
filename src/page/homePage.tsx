import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Image } from 'primereact/image';
import { Card } from 'primereact/card';
import { useCart } from '../context/cartContext';
import { products } from "../data/womensProduct";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import TopBar from '../component/topbar';
import Footer from '../component/footer';


const backgroundSlides = [
    {
        image: "/images/homeFrame1.jpg",
        title: "UPTO 70%",
        subtitle: "YOUR DRESS UP CLOTHES FIRST",
    },
    {
        image: "/images/homeFrame2.png",
        title: "KID COLLECTION",
        subtitle: "CHILDHOOD",
    },
    {
        image: "/images/homeFrame3.png",
        title: "UPTO 70%",
        subtitle: "NEW YEAR SPECIAL SALE OFF!!!",
    }
];

const blogPosts = [
    {
        id: 1,
        title: 'MIX & MATCH WEEKEND',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac tincidunt eros ...',
        image: '/images/blog1.png'
    },
    {
        id: 2,
        title: 'LONDON FASHION WEEK 2015',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac tincidunt eros ...',
        image: '/images/blog2.png'
    }
];


export default function HomePage() {
    const { addToCart } = useCart();
    const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const currentSlide = backgroundSlides[currentIndex];


    return (
        <div>
            <TopBar />
            <div
                className="relative flex align-items-center justify-content-center text-center"
                style={{
                    height: '40rem',
                    backgroundImage: `url(${currentSlide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    overflow: 'hidden',
                    transition: 'background-image 1s ease-in-out',
                }}
            >
                <div
                    className="absolute w-full h-full"
                    style={{
                        backgroundColor: '#FFE1E2',
                        opacity: 0.4,
                        top: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                />

                <div className="text-black px-4" style={{ zIndex: 2, fontFamily: 'Aboreto' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{currentSlide.title}</h2>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                        {currentSlide.subtitle}
                    </h1>
                    <Button
                        label="SHOP NOW"
                        className="p-button-rounded p-button-secondary"
                        style={{
                            backgroundColor: isHovered ? '#FFE1E2' : '#000000',
                            color: isHovered ? '#000000' : '#FFE1E2',
                            border: '1px solid black',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => {
                            navigate('/sale');
                            window.scrollTo(0, 0);
                        }}
                    />
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-content-between align-items-center ml-4">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>NEW COLLECTION</h2>
                </div>

                <div className="flex flex-wrap justify-content-center gap-2">
                    {products.slice(-4).map((product) => (
                        <Link
                            to={`/product/${product.id}`}
                            state={{ product }}
                            className="no-underline text-color-inherit"
                        >
                            <Card key={product.id} style={{ width: '300px', minWidth: '200px' }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '100%', height: '25rem', objectFit: 'cover', borderRadius: '6px' }}
                                />
                                <div className="p-2" style={{ fontSize: '12px' }}>
                                    <p style={{ fontWeight: '600', textTransform: 'uppercase', color: '#1f2937', marginTop: '0.5rem' }}>
                                        {product.name}
                                    </p>
                                    <div className="flex align-items-center gap-2 mt-1">
                                        <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '12px' }}>
                                            Rs {product.originalPrice.toLocaleString()}
                                        </span>
                                        <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#000' }}>
                                            Rs {product.price.toLocaleString()}
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
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex flex-column align-items-center justify-content-center text-center py-6 px-4 w-full"
                style={{ backgroundColor: '#F4E7E7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Aboreto' }}>
                    <i className="pi pi-envelope" style={{ fontSize: '1.5rem', color: 'black' }}></i>
                    <h3 className="font-bold" style={{ fontSize: '1.5rem', margin: 0 }}>
                        SUBSCRIBE
                    </h3>
                </div>
                <p className="mb-4" style={{ fontFamily: 'Aboreto', fontSize: '1.5rem' }}>Get the latest news & updates from Aurao</p>
                <div className="flex flex-column sm:flex-row gap-2">
                    <InputText placeholder="Your email address" className="p-inputtext-sm w-20rem text-center" style={{ borderRadius: '25rem' }} />
                    <Button label="SUBSCRIBE" className="p-button-sm p-button-secondary" style={{ background: 'black', borderRadius: '25rem', height: '45px', width: '325px' }} />
                </div>
            </div>

            <div className="flex flex-wrap justify-content-center align-items-center px-4 py-6 gap-4">
                {['FEATURES', 'WOMEN', 'KIDS'].map((label, i) => (
                    <div key={label} className="w-12 sm:w-4 md:w-3 lg:w-3">
                        <div className="relative">
                            <Image
                                src={`/images/homeimage${i + 2}.png`}
                                alt={label}
                                imageClassName="w-full border-round-lg"
                            />
                            <div
                                className="absolute top-0 left-0 w-full h-full border-round-lg"
                                style={{ backgroundColor: '#F4E7E733' }}
                            ></div>

                            <div className="absolute top-0 left-0 w-full h-full flex align-items-center justify-content-center">
                                <span className="text-white text-5xl font-bold px-3 py-2 border-round surface-overlay">
                                    {label}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap justify-content-center gap-4 px-4 py-6">
                {[
                    {
                        icon: 'pi pi-clock',
                        title: 'OPENING ALL WEEK',
                        subtitle: '8.00AM - 8.00PM',
                    },
                    {
                        icon: 'pi pi-tags',
                        title: '50% OFF WOMEN T-SHIRTS',
                        subtitle: 'ON ORDER OVER 5000LKR',
                    },
                    {
                        icon: 'pi pi-send',
                        title: 'FREE SHIP ALL ORDERS',
                        subtitle: 'WORLDWIDE SHIPPING',
                    },
                ].map((item, idx) => (
                    <Card
                        key={idx}
                        className="flex-grow-1 sm:w-full md:w-6 lg:w-3"
                        style={{
                            backgroundColor: '#000000',
                            color: '#FFE1E2',
                            textAlign: 'center',
                            minWidth: '250px',
                            maxWidth: '400px',
                            width: '100%',
                        }}
                    >
                        <i className={`${item.icon} text-3xl mb-2`}></i>
                        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            {item.title}
                        </div>
                        <div>{item.subtitle}</div>
                    </Card>
                ))}
            </div>

            <div className="p-4">
                <div className="flex justify-content-between align-items-center mb-4 ml-4">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>BEST SELLER</h2>
                </div>

                <div className="flex flex-wrap justify-content-center gap-2">
                    {products.slice(7, 11).map((product) => (
                        <Link
                            to={`/product/${product.id}`}
                            state={{ product }}
                            className="no-underline text-color-inherit"
                        >
                            <Card
                                key={product.id}
                                className="relative"
                                style={{ width: '300px', minWidth: '200px' }}
                            >
                                <div className="absolute top-3 left-3 z-10 bg-black text-white text-[11px] px-2 py-1 rounded-full mt-2 ml-2"
                                    style={{ background: 'black', borderRadius: '25rem' }}>
                                    Save 50%
                                </div>

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
                                        style={{ width: '65%', fontSize: '12px', marginTop: '0.75rem', background: '#000000' }}
                                        onClick={() => addToCartHandler(product)}
                                    />
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex flex-column md:flex-row align-items-start justify-content-start gap-4 py-6 px-4 w-full" style={{ backgroundColor: '#F1F1F1' }}>
                <div className="w-full md:w-6 flex justify-content-center">
                    <Image
                        src="/images/homeimage5.png"
                        alt="Denim"
                        preview={false}
                        imageStyle={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        className="border-round-lg"
                    />
                </div>

                <div className="w-full md:w-6 p-4 flex flex-column text-left denim-section">
                    <h2 className="text-xl font-bold mb-2">Denim & Jeans</h2>
                    <p className="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non sapien in ligula malesuada semper. In non quam ex.
                    </p>
                    <Button
                        label="SHOP NOW"
                        className="p-button-rounded p-button-secondary"
                        style={{
                            backgroundColor: isHovered ? '#FFE1E2' : '#000000',
                            color: isHovered ? '#000000' : '#FFE1E2',
                            border: '1px solid black',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => {
                            navigate('/sale');
                            window.scrollTo(0, 0);
                        }}

                    />
                </div>
            </div>

            <div className="p-4 text-left">
                <h2 className="text-2xl font-bold mb-4">BLOG UPDATES</h2>
                <div className="grid md:col-12">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="col-12 md:col-6">
                            <Card className="shadow-1 p-3">
                                <div className="flex text-left gap-3">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        width="200"
                                        height="200"
                                        className="border-round"
                                    />
                                    <div className="flex flex-column gap-1" style={{ fontFamily: 'Aboreto' }}>
                                        <span className="font-bold text-lg mb-1 ml-3" style={{ color: '#000000' }}>{post.title}</span>
                                        <span className="text-mb mb-2 ml-3" style={{ color: '#000000' }}>{post.description}</span>
                                        <Button label="READ MORE" link className="button-md text-left" style={{ color: '#A03F3F' }} />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
