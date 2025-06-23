import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Image } from 'primereact/image';
import { Card } from 'primereact/card';

export default function HomePage() {
    const products = [
        {
            id: 1,
            name: "UTILITY JACKET",
            price: "18999.00",
            oldPrice: null,
            image: "/images/product1.jpg",
            cashbackInfo: "3 x Rs 6,333 or 4.5% cashback with or pay 3 x Rs 6,333 with",
            colors: ['#000000', '#D4B4AF', '#F6EAE1'],
        },
        {
            id: 2,
            name: "CORT WITH WOOL WRAPAROUND COLLAR",
            price: "10099.00",
            oldPrice: "18999.00",
            image: "/images/product2.jpg",
            cashbackInfo: "3 x Rs 3,366.33 or 4.5% cashback with or pay 3 x Rs 3,366.33 with",
            colors: ['#000000', '#D4B4AF', '#F6EAE1'],
        },
        {
            id: 3,
            name: "HANDMADE FLARED JACKET",
            price: "18999.00",
            oldPrice: null,
            image: "/images/product3.jpg",
            cashbackInfo: "3 x Rs 6,333 or 4.5% cashback with or pay 3 x Rs 6,333 with",
            colors: ['#000000', '#D4B4AF', '#F6EAE1'],
        },
        {
            id: 4,
            name: "UTILITY JACKET",
            price: "18999.00",
            oldPrice: null,
            image: "/images/product4.jpg",
            cashbackInfo: "3 x Rs 6,333 or 4.5% cashback with or pay 3 x Rs 6,333 with",
            colors: ['#000000', '#D4B4AF', '#F6EAE1'],
        },
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

    return (
        <div className="p-fluid">

            <div
                className="relative flex align-items-center justify-content-center text-center"
                style={{
                    height: '40rem',
                    backgroundImage: "url('/images/homeimage1.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div
                    className="absolute w-full h-full"
                    style={{
                        backgroundColor: '#FFE1E2',
                        opacity: 0.4,
                        top: 0,
                        left: 0,
                        zIndex: 1
                    }}
                />

                <div className="text-black" style={{ zIndex: 2, fontFamily: 'Aboreto' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>UPTO 70%</h2>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>YOUR DRESS UP CLOTHES FIRST</h1>
                    <Button
                        label="SHOP NOW"
                        className="p-button-rounded p-button-secondary"
                        style={{ backgroundColor: 'black', borderColor: 'black' }}
                    />
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-content-between align-items-center">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>NEW COLLECTION</h2>
                </div>

                <div className="flex flex-wrap justify-content-center gap-2">
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            className="relative"
                            style={{ width: '350px', minWidth: '250px' }}
                        >
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
                                    {product.oldPrice && (
                                        <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '12px' }}>
                                            Rs {product.oldPrice}
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
                                    {product.cashbackInfo}
                                </p>


                                <div className="flex gap-2 mt-2">
                                    {product.colors.map((color, i) => (
                                        <div
                                            key={i}
                                            className="border-circle"
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
                                    {['S', 'M', 'L', 'XL'].map((size) => (
                                        <Button
                                            key={size}
                                            label={size}
                                            size="small"
                                            severity="secondary"
                                            outlined
                                            style={{
                                                fontSize: '10px',
                                                padding: '0.25rem 0.5rem',
                                                height: '2rem'
                                            }}
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
                                        width: '100%',
                                        fontSize: '12px',
                                        marginTop: '0.75rem'
                                    }}
                                />
                            </div>
                        </Card>
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
                    <Button label="SUBSCRIBE" className="p-button-sm p-button-secondary" style={{ background: 'black', borderRadius: '25rem' }} />
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

            <div className="flex justify-content-center gap-4 px-4 py-6 flex-wrap-none">
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
                        className="flex-grow-0"
                        style={{
                            backgroundColor: '#000',
                            color: '#fff',
                            textAlign: 'center',
                            width: '400px',
                        }}
                    >
                        <i className={`${item.icon} text-3xl mb-2`}></i>
                        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            {item.title}</div>
                        <div>{item.subtitle}</div>
                    </Card>
                ))}
            </div>

            <div className="p-4">
                <div className="flex justify-content-between align-items-center mb-4">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>NEW COLLECTION</h2>
                </div>

                <div className="flex flex-wrap justify-content-center gap-2">
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            className="relative"
                            style={{ width: '350px', minWidth: '250px' }}
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
                                    {product.oldPrice && (
                                        <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '12px' }}>
                                            Rs {product.oldPrice}
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
                                    {product.cashbackInfo}
                                </p>

                                <div className="flex gap-2 mt-2">
                                    {product.colors.map((color, i) => (
                                        <div
                                            key={i}
                                            className="border-circle"
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
                                    {['S', 'M', 'L', 'XL'].map((size) => (
                                        <Button
                                            key={size}
                                            label={size}
                                            size="small"
                                            severity="secondary"
                                            outlined
                                            style={{
                                                fontSize: '10px',
                                                padding: '0.25rem 0.5rem',
                                                height: '2rem'
                                            }}
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
                                        width: '100%',
                                        fontSize: '12px',
                                        marginTop: '0.75rem'
                                    }}
                                />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div
                className="flex flex-row align-items-start justify-content-start py-6 px-4 w-full"
                style={{ backgroundColor: '#F1F1F1' }}
            >
                <div style={{ width: '600px', height: 'auto', flexShrink: 0 }}>
                    <Image
                        src="/images/homeimage5.png"
                        alt="Denim"
                        preview={false}
                        imageStyle={{ width: '550px', height: 'auto', objectFit: 'fill' }}
                        className="border-round-lg"
                    />
                </div>

                <div className="p-4 flex flex-column text-left" style={{ maxWidth: '700px' }}>
                    <h2 className="text-xl font-bold mb-2">Denim & Jeans</h2>
                    <p className="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non sapien in ligula malesuada semper. In non quam ex.
                    </p>
                    <Button
                        label="SHOP NOW"
                        className="p-button-rounded p-button-secondary"
                        style={{ background: 'black', borderColor: 'black' }}
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
                                        <span className="font-bold text-lg mb-1 ml-3">{post.title}</span>
                                        <span className="text-mb mb-2 ml-3">{post.description}</span>
                                        <Button label="READ MORE" link className="button-md text-left" />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
