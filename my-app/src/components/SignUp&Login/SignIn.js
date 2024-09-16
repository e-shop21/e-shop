import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('SignIn Request:', { email, password });
            const response = await axios.post('http://localhost:1274/api/auth/signin', { email, password });
            console.log('SignIn Response:', response.data);
            localStorage.setItem('token', response.data.token);
            if (response.data.user.role === 'seller') {
                navigate('/seller/dashboard');
            } else if (response.data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setError('Invalid email or password');
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1, backgroundColor: '#e6f2f5' }}>
                <img
                    src="https://www.evanik.com/wp-content/uploads/2021/10/New-Project-10.png"
                    alt="Shopping concept"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Sign In</h1>
                <p style={{ marginBottom: '2rem', color: '#666' }}>Enter your details below</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                    />
                    <button type="submit" style={buttonStyle}>Sign In</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Don't have an account? <a href="/signup" style={{ color: '#000', textDecoration: 'none' }}>Create account</a>
                </p>
            </div>
        </div>
    );
};

const inputStyle = {
    padding: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
};

const buttonStyle = {
    padding: '0.75rem',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
};

const googleButtonStyle = {
    padding: '0.75rem',
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',
};

export default SignIn;