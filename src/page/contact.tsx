import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import Footer from '../component/footer';
import TopBar from '../component/topbar';

export default function ContactPage() {
    return (
        <div className="flex flex-column min-h-screen justify-content-between">
            <TopBar />
            <div className="surface-50 px-3 py-5 sm:px-4 md:px-6">
                <div className="border-round mx-auto mt-6 p-4 sm:p-6" style={{ maxWidth: '900px', background: '#F4E7E733' }}>
                    <h2 className="text-center text-2xl font-bold mb-6">GET IN TOUCH NOW!</h2>

                    <div className="grid formgrid p-fluid">
                        {/* Name */}
                        <div className="col-12 md:col-3 flex align-items-center justify-content-start md:justify-content-center font-semibold mb-2 md:mb-5">
                            Name:
                        </div>
                        <div className="col-12 md:col-9 mb-4">
                            <InputText
                                placeholder="Enter your name"
                                className="w-full p-inputtext-sm"
                                style={{ background: '#FFE1E266' }}
                            />
                        </div>

                        {/* Email */}
                        <div className="col-12 md:col-3 flex align-items-center justify-content-start md:justify-content-center font-semibold mb-2 md:mb-5">
                            Email:
                        </div>
                        <div className="col-12 md:col-9 mb-4">
                            <InputText
                                placeholder="Enter your email"
                                className="w-full p-inputtext-sm"
                                style={{ background: '#FFE1E266' }}
                            />
                        </div>

                        {/* Message */}
                        <div className="col-12 md:col-3 flex align-items-start justify-content-start md:justify-content-center font-semibold mb-2 md:mb-0">
                            Message:
                        </div>
                        <div className="col-12 md:col-9 mb-4">
                            <InputTextarea
                                rows={5}
                                placeholder="Enter your message"
                                className="w-full"
                                style={{ background: '#FFE1E266' }}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="col-12 flex justify-content-center mt-2">
                            <Button
                                label="SEND"
                                className="text-white border-round text-sm px-4 py-2"
                                style={{ width: '100%', maxWidth: '220px', borderRadius: '25px', background: '#000000'}}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
