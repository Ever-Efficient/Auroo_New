import { Divider } from "primereact/divider";

export default function Footer() {
    return (
        <div className="px-4 py-6 text-s text-gray-700" style={{ background: '#F4E7E7' }}>
            <div className="grid grid-nogutter md:grid-cols-4 align-items-center justify-content-between text-center">
                <div className="mb-2">
                    <h4 className="font-bold">LOCATION</h4>
                    <p>Peradeniya Road, Kandy</p>
                    <p>Tel. +94 77 575 7735</p>
                    <p>Email. auroo@example.com</p>
                </div>
                <div className="">
                    <h4 className="font-bold">HELP</h4>
                    <p>How to Buy</p>
                    <p>Order Info</p>
                    <p>Shipping</p>
                    <p>Returns</p>
                </div>
                <div className="">
                    <h4 className="font-bold">POLICIES</h4>
                    <p>Privacy Policy</p>
                    <p>Return Policy</p>
                    <p>Terms & Conditions</p>
                </div>
                <div className="">
                    <h4 className="font-bold">COMPANY</h4>
                    <p>About Us</p>
                    <p>Work With Us</p>
                    <p>Contact</p>
                </div>
            </div>
            <Divider className="my-4" />
            <div className="text-center ml-4">
                Powered by <a href="https://everefficient.lk" target="_blank" rel="noopener noreferrer" className="text-primary font-medium">
                    EVER EFFICIENT Business Management (Pvt) Ltd
                </a>
            </div>

        </div>
    );
}