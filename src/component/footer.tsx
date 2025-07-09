import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();

    return (
        <div className="p-4 mt-5 flex-column" style={{ background: '#F4E7E7', color: '#4B5563' }}>
            <div className="grid ml-8">
                <div className="col-12 md:col-3">
                    <h4 className="font-bold mb-2">LOCATION</h4>
                    <p>Peradeniya Road, Kandy</p>
                    <p>Tel. +94 77 575 7735</p>
                    <p>Email. info@auroofashion.com</p>
                </div>

                <div className="col-12 md:col-3">
                    <h4 className="font-bold mb-3">HELP</h4>
                    {[
                        { label: 'HOW TO BUY', path: '/info' },
                        { label: 'GENERAL INFORMATION', path: '/info' },
                        { label: 'PAYMENT', path: '/info' },
                        { label: 'SHIPPING', path: '/info' },
                        { label: 'RETURNS', path: '/info' },
                        { label: 'EXCHANGES', path: '/info' },
                        { label: 'GIFT CARD', path: '/info' },
                        { label: 'MY ACCOUNT', path: '/info' },
                        { label: 'WATCHES', path: '/info' }
                    ].map((item, i) => (
                        <span key={i} className="block mb-3 text-color cursor-pointer" onClick={() => navigate(item.path)}>
                            {item.label}
                        </span>
                    ))}
                </div>

                <div className="col-12 md:col-3">
                    <h4 className="font-bold mb-3">POLICIES</h4>
                    {[
                        { label: 'ENVIRONMENTAL POLICY', path: '/policy' },
                        { label: 'ANIMAL WELFARE', path: '/terms' },
                        { label: 'PRIVACY POLICY', path: '/policy' },
                        { label: 'PURCHASE CONDITIONS', path: '/terms' },
                        { label: 'GIFT CARD CONDITIONS', path: '/terms' },
                        { label: 'WARRANTY ON WATCHES', path: '/policy' }
                    ].map((item, i) => (
                        <span key={i} className="block mb-3 text-color cursor-pointer" onClick={() => navigate(item.path)}>
                            {item.label}
                        </span>
                    ))}
                </div>

                <div className="col-12 md:col-3">
                    <h4 className="font-bold mb-3">COMPANY</h4>
                    {[
                        { label: 'ABOUT US', path: '/aboutus' },
                        { label: 'OFFICES', path: '/contact' },
                        { label: 'STORES', path: '/contact' },
                        { label: 'WORK WITH US', path: '/careers' },
                        { label: 'CONTACT', path: '/contact' }
                    ].map((item, i) => (
                        <span key={i} className="block mb-3 text-color cursor-pointer" onClick={() => navigate(item.path)}>
                            {item.label}
                        </span>
                    ))}
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
                    style={{ color: '#4B5563' }}
                >
                    EVER EFFICIENT Business Management (Pvt) Ltd
                </a>
            </div>
        </div>
    );
}