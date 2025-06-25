import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState } from 'react';

interface Props {
    visible: boolean;
    onHide: () => void;
    onLoginSuccess: (email: string) => void;
}

export default function Login({ visible, onHide, onLoginSuccess }: Props) {
    const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const clearState = () => {
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setError('');
        setMode('login');
    };

    const handleLogin = () => {
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        if (email === 'test@test.com' && password === 'test123') {
            setError('');
            onLoginSuccess(email);
            clearState(); 
            onHide();
        } else {
            setError('Invalid email or password.');
        }
    };

    const handleRegister = () => {
        if (!firstName || !lastName || !email || !password) {
            setError('Please fill all fields.');
            return;
        }

        setError('');
        onLoginSuccess(email);
        clearState();
        onHide();
    };

    const handleForgot = () => {
        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        // Simulate success
        setError('');
        alert('Password reset link sent to your email!');
        clearState();
        onHide();
    };

    return (
        <Dialog
            header={
                mode === 'register' ? 'Create an Account' :
                    mode === 'forgot' ? 'Reset Password' : 'Login'
            }
            visible={visible}
            onHide={() => {
                clearState();
                onHide();
            }}
            style={{ width: '90vw', maxWidth: '400px' }}
            className="p-fluid text-center"
        >

            {mode === 'login' && (
                <>
                    <p className="text-sm mb-4">If you have an account with us, please log in.</p>
                    <InputText value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="mb-2" />
                    <InputText value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="mb-2" />

                    {error && <small className="text-red-500 block mb-2">{error}</small>}

                    <Button label="Sign In" onClick={handleLogin} style={{ background: '#000000', borderColor: 'black' }} className="w-full mb-3 p-button-rounded" />

                    <div className="text-center text-sm">
                        <p>
                            Don’t have an account?{' '}
                            <span className="text-primary font-medium cursor-pointer" onClick={() => { clearState(); setMode('register'); }}>
                                Create an account
                            </span>
                        </p>
                        <p className="mt-2">
                            <span className="text-primary font-medium cursor-pointer" onClick={() => { clearState(); setMode('forgot'); }}>
                                Forgot your password?
                            </span>
                        </p>
                    </div>
                </>
            )}

            {mode === 'register' && (
                <>
                    <p className="text-sm mb-4">
                        Enter your information below to proceed. If you already have an account, please log in instead.
                    </p>
                    <div className="flex flex-column sm:flex-row gap-2 mb-3">
                        <InputText value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" className="w-full" />
                        <InputText value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" className="w-full" />
                    </div>
                    <InputText value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="mb-2" />
                    <InputText value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="mb-3" />

                    {error && <small className="text-red-500 block mb-2">{error}</small>}

                    <Button label="Create an account" onClick={handleRegister} style={{ background: '#000000', borderColor: 'black' }} className="w-full mb-3 p-button-rounded" />

                    <div className="text-center text-sm">
                        <p>
                            Already have an account?{' '}
                            <span className="text-primary font-medium cursor-pointer" onClick={() => { clearState(); setMode('login'); }}>
                                Login
                            </span>
                        </p>
                    </div>
                </>
            )}

            {mode === 'forgot' && (
                <>
                    <p className="text-sm mb-4">If you have an account with us, please log in.</p>
                    <InputText value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="mb-3" />

                    {error && <small className="text-red-500 block mb-2">{error}</small>}

                    <Button label="Submit" onClick={handleForgot} style={{ background: '#000000', borderColor: 'black' }} className="w-full mb-3 p-button-rounded" />

                    <span className="text-primary text-sm cursor-pointer underline" onClick={() => setMode('login')}>
                        Cancel
                    </span>
                </>
            )}
        </Dialog>
    );
}