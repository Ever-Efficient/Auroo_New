import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';

export default function Error404Page() {
    return (
        <div className="flex justify-content-center align-items-center min-h-screen surface-100 p-4">
            <Card className="text-center shadow-4 p-6" style={{ maxWidth: '500px', borderRadius: '16px' }}>
                <Image
                    src="./images/Error404.png"
                    alt="404"
                    style={{ width: '300px', height: 'auto' }}
                    imageClassName="mb-2"
                    preview={false}
                />

                <p className="text-600 mb-6">
                    Sorry, the page you are looking for doesn't exist or has been moved.
                </p>
                <Button
                    label="Go to Home"
                    icon="pi pi-home"
                    style={{ backgroundColor: '#000000' }}
                    className="p-button-primary"
                    onClick={() => window.location.href = '/'}
                />
            </Card>
        </div>
    );
}