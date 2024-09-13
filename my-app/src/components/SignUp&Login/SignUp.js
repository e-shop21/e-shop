import React from 'react';

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left side - Image */}
      <div style={{ flex: 1, backgroundColor: '#e6f2f5' }}>
        <img
          src="/path-to-your-image.jpg"
          alt="Shopping concept"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Right side - Sign Up Form */}
      <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Create an account</h1>
        <p style={{ marginBottom: '2rem', color: '#666' }}>Enter your details below</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Email or Phone Number"
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
          />
          <button
            type="submit"
            style={buttonStyle}
          >
            Create Account
          </button>
        </form>

        <button style={googleButtonStyle}>
          <img
            src="/path-to-google-icon.png"
            alt="Google"
            style={{ width: '20px', marginRight: '10px' }}
          />
          Sign up with Google
        </button>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Already have account? <a href="/login" style={{ color: '#000', textDecoration: 'none' }}>Log in</a>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '1rem',
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#e32636',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  cursor: 'pointer',
};

const googleButtonStyle = {
  ...buttonStyle,
  backgroundColor: 'white',
  color: '#000',
  border: '1px solid #ccc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '1rem',
};

export default SignUp;