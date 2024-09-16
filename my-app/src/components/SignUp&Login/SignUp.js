import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:1274/api/auth/signup`, { email, password, role });
            localStorage.setItem('token', response.data.token);
            if (response.data.user.role === 'seller') {
                navigate('/seller/dashboard');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error signing up:', error);
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
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Create an account</h1>
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
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="user">Customer</option>
                        <option value="seller">Seller</option>
                    </select>
                    <button type="submit" style={buttonStyle}>Create Account</button>
                </form>
               
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Already have an account? <a href="/signin" style={{ color: '#000', textDecoration: 'none' }}>Log in</a>
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

export default SignUp;