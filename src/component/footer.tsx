import { Divider } from "primereact/divider";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="p-4" style={{ background: '#F4E7E7', color: '#4B5563' }}>
            <div className="grid mt-2">
                <div className="col-12 md:col-3 text-center md:text-center mb-2">
                    <h4 className="font-bold mb-2">LOCATION</h4>
                    <p>Peradeniya Road, Kandy</p>
                    <p>Tel. +94 77 575 7735</p>
                    <p>Email. auroo@example.com</p>
                </div>

                <div className="col-12 md:col-3 text-center md:text-center mb-3">
                    <h4 className="font-bold mb-3">HELP</h4>
                    <Link to="/info" className="block mb-3 text-color">HOW TO BUY</Link>
                    <Link to="/info" className="block mb-3 text-color">GENERAL INFORMATION</Link>
                    <Link to="/info" className="block mb-3 text-color">PAYMENT</Link>
                    <Link to="/info" className="block mb-3 text-color">SHIPPING</Link>
                    <Link to="/info" className="block mb-3 text-color">RETURNS</Link>
                    <Link to="/info" className="block mb-3 text-color">EXCHANGES</Link>
                    <Link to="/info" className="block mb-3 text-color">GIFT CARD</Link>
                    <Link to="/info" className="block mb-3 text-color">MY ACCOUNT</Link>
                    <Link to="/info" className="block mb-3 text-color">WATCHES</Link>
                </div>

                <div className="col-12 md:col-3 text-center md:text-center mb-3">
                    <h4 className="font-bold mb-3">POLICIES</h4>
                    <Link to="/policy" className="block mb-3 text-color">ENVIRONMENTAL POLICY</Link>
                    <Link to="/terms" className="block mb-3 text-color">ANIMAL WELFARE</Link>
                    <Link to="/policy" className="block mb-3 text-color">PRIVACY POLICY</Link>
                    <Link to="/terms" className="block mb-3 text-color">PURCHASE CONDITIONS</Link>
                    <Link to="/terms" className="block mb-3 text-color">GIFT CARD CONDITIONS</Link>
                    <Link to="/policy" className="block mb-3 text-color">WARRANTY ON WATCHES</Link>
                </div>

                <div className="col-12 md:col-3 text-center md:text-center mb-3">
                    <h4 className="font-bold mb-3">COMPANY</h4>
                    <Link to="/aboutus" className="block mb-3 text-color">ABOUT US</Link>
                    <Link to="/contact" className="block mb-3 text-color">OFFICES</Link>
                    <Link to="/contact" className="block mb-3 text-color">STORES</Link>
                    <Link to="/careers" className="block mb-3 text-color">WORK WITH US</Link>
                    <Link to="/contact" className="block mb-3 text-color">CONTACT</Link>
                </div>
            </div>
            <Divider className="my-4" />

            <div className="text-center mt-2">
                Powered by{" "}
                <a
                    href="https://everefficient.lk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium"
                    style={{ color: '#6366F1' }}
                >
                    EVER EFFICIENT Business Management (Pvt) Ltd
                </a>
            </div>
        </div>
    );
}