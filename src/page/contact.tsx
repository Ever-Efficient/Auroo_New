import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import Footer from '../component/footer';
import TopBar from '../component/topbar';

export default function ContactPage() {
    return (
        <div className="flex flex-column min-h-screen justify-content-between">
            <TopBar />
            <div className="surface-50 p-5">
                <div className="border-round mx-auto mt-6" style={{ maxWidth: '900px', background: '#F4E7E733' }}>
                    <h2 className="text-center text-2xl font-bold ml-6">GET IN TOUCH NOW!</h2>
                    <div className="grid formgrid p-fluid p-7 mr-6">
                        <div className="col-12 md:col-3 flex align-items-center justify-content-end font-semibold mb-5">
                            Name :
                        </div>
                        <div className="col-12 md:col-9 mb-4">
                            <InputText placeholder="Enter your name" className="w-full p-inputtext-sm" style={{background: '#FFE1E266'}}/>
                        </div>

                        <div className="col-12 md:col-3 flex align-items-center justify-content-end font-semibold mt-3 md:mt-0 mb-5">
                            Email :
                        </div>
                        <div className="col-12 md:col-9 mb-4">
                            <InputText placeholder="Enter your email" className="w-full p-inputtext-sm" style={{background: '#FFE1E266'}} />
                        </div>

                        <div className="col-12 md:col-3 flex align-items-start justify-content-end font-semibold">
                            Message :
                        </div>
                        <div className="col-12 md:col-9 mb-4">
                            <InputTextarea rows={5} placeholder="Enter your message" className="w-full" style={{background: '#FFE1E266'}} />
                        </div>

                        <div className="w-full flex justify-content-center mt-4 ml-8">
                            <Button
                                label="SEND"
                                className="bg-black text-white border-round text-sm px-4 py-2"
                                style={{ width: '220px', background: 'black' }}
                            />
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
