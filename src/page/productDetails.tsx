import { useState } from 'react';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import TopBar from '../component/topbar';
import Footer from '../component/footer';

const recommendedProducts = [
    {
        name: "UTILITY JACKET",
        price: "RS 18999.00",
        discount: "SAVE 50%",
        image: "/images/product1.jpg"
    },
    {
        name: "CORT WITH WOOL WRAPAROUND COLLAR",
        price: "RS 10999.00",
        originalPrice: "RS 18999.00",
        discount: "SAVE 50%",
        image: "/images/product2.jpg"
    },
    {
        name: "HANDMADE FLARED JACKET",
        price: "RS 18999.00",
        discount: "SAVE 50%",
        image: "/images/product3.jpg"
    },
    {
        name: "UTILITY JACKET",
        price: "RS 18999.00",
        discount: "SAVE 50%",
        image: "/images/product4.jpg"
    }
];

export default function ProductDetailPage() {
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('#1D2D5A');

    const sizes = ['S', 'M', 'L', 'XL'];
    const colors = ['#1D2D5A', '#C9A068', '#6A4C2B'];

    return (
        <div className="flex flex-column min-h-screen">
            <TopBar />

            <div className="grid p-4">
                <div className="col-12 md:col-7 grid">
                    {[1, 2, 3, 4, 5, 6].map((_, idx) => (
                        <div key={idx} className="col-6 p-2">
                            <Image src="/images/model.jpg" alt="product" imageClassName="w-full border-round" />
                        </div>
                    ))}
                </div>

                <div className="col-12 md:col-5 p-4">
                    <h2 className="text-xl font-semibold mb-2">CORT WITH WOOL WRAPAROUND COLLAR</h2>
                    <div className="flex align-items-center gap-2 mb-2">
                        <Rating value={5} readOnly stars={5} cancel={false} />
                        <span className="text-sm text-gray-500">(30 Reviews)</span>
                    </div>
                    <div className="mb-3">
                        <span className="line-through text-gray-400 mr-2">RS 18999.00</span>
                        <span className="text-pink-500 font-semibold">RS 10099.00</span>
                    </div>

                    <div className="mb-3">
                        <span className="font-medium mr-3">Color</span>
                        <div className="flex gap-2 mt-2">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-2rem h-2rem border-circle border-2 ${selectedColor === color ? 'border-black' : 'border-300'}`}
                                    style={{ backgroundColor: color }}
                                    aria-label={`Select color ${color}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <span className="font-medium mr-3">Size</span>
                        <div className="flex gap-2 mt-2">
                            {sizes.map((size) => (
                                <Button
                                    key={size}
                                    label={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`text-sm px-3 py-2 ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black border-1 border-300'}`}
                                />
                            ))}
                        </div>
                        <div className="mt-1 text-xs underline text-gray-500">Size Guide</div>
                    </div>

                    <Button label="ADD TO BAG" className="bg-black text-white w-full border-round text-sm mb-3" />

                    <ul className="list-none text-sm mt-4 pl-0">
                        <li className="mb-2">Free Shipping on all U.S. orders over $100</li>
                        <li className="mb-2">Free Returns through January 31</li>
                        <li>Add as a Gift: Personalize during checkout</li>
                    </ul>

                    <Divider />

                    <p className="text-sm text-gray-800">
                        <strong>Model:</strong> 6’2”, wearing a size M<br />
                        <strong>Fit:</strong> Questions about fit? <span className="underline">Contact us</span>
                    </p>

                    <p className="text-sm mt-3">
                        <strong>Sustainability</strong><br />
                        Recycled Materials<br />
                        Cleaner Chemistry
                    </p>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold mb-3">Recommended Products</h3>
                <div className="grid">
                    {recommendedProducts.map((item, idx) => (
                        <div key={idx} className="col-6 md:col-3">
                            <Card className="border-none shadow-none">
                                <div className="relative">
                                    <Image src={item.image} alt={item.name} imageClassName="w-full border-round" />
                                    {item.discount && (
                                        <span className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 border-round m-2">
                                            {item.discount}
                                        </span>
                                    )}
                                </div>
                                <div className="mt-2 text-sm">
                                    <div className="font-medium">{item.name}</div>
                                    {item.originalPrice ? (
                                        <div>
                                            <span className="line-through text-gray-400 mr-2">{item.originalPrice}</span>
                                            <span>{item.price}</span>
                                        </div>
                                    ) : (
                                        <div>{item.price}</div>
                                    )}
                                    <div className="text-xs text-gray-500">3 X Rs 3,666 or 4.5% cashback with card</div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold mb-3">Reviews</h3>
                <div className="mb-4 flex align-items-center gap-2">
                    <Rating value={5} readOnly stars={5} cancel={false} />
                    <span className="text-sm">5.0 Overall Rating</span>
                </div>

                <div className="mb-3">
                    <strong>ElizabethR8klyn</strong> <span className="text-xs">Verified</span>
                    <p className="text-sm mt-1">Got this to keep my husband warm on those chilly late fall days. Looks great and fits well.</p>
                </div>

                <Divider />

                <div className="mb-3">
                    <strong>Anonymous</strong> <span className="text-xs">Verified</span>
                    <p className="text-sm mt-1">Great quality, warm and super comfy. The XL fits perfectly. Slightly oversized.</p>
                </div>
            </div>

            <Footer />
        </div>
    );
}