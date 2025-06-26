import { Divider } from "primereact/divider";

export default function Footer() {
    return (
        <div className="p-4" style={{ background: '#F4E7E7', color: '#4B5563' }}>
            {/* Grid Layout */}
            <div className="grid mt-2">
                {/* LOCATION */}
                <div className="col-12 md:col-3 text-center md:text-center mb-3">
                    <h4 className="font-bold mb-2">LOCATION</h4>
                    <p>Peradeniya Road, Kandy</p>
                    <p>Tel. +94 77 575 7735</p>
                    <p>Email. auroo@example.com</p>
                </div>

                {/* HELP */}
                <div className="col-12 md:col-3 text-center md:text-center mb-3">
                    <h4 className="font-bold mb-2">HELP</h4>
                    <p>How to Buy</p>
                    <p>Order Info</p>
                    <p>Shipping</p>
                    <p>Returns</p>
                </div>

                {/* POLICIES */}
                <div className="col-12 md:col-3 text-center md:text-center mb-3">
                    <h4 className="font-bold mb-2">POLICIES</h4>
                    <p>Privacy Policy</p>
                    <p>Return Policy</p>
                    <p>Terms & Conditions</p>
                </div>

                {/* COMPANY */}
                <div className="col-12 md:col-3 text-center md:text-center mb-3">
                    <h4 className="font-bold mb-2">COMPANY</h4>
                    <p>About Us</p>
                    <p>Work With Us</p>
                    <p>Contact</p>
                </div>
            </div>

            {/* Divider */}
            <Divider className="my-4" />

            {/* Footer Bottom */}
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