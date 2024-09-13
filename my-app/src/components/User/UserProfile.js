import React, { useState } from 'react';
import Sidebar from './Sidebar';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Profile updated:', profile);
  };

  

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <a href="/" style={styles.navLink}>Home</a>
        <span style={styles.navSeparator}>/</span>
        <span style={styles.navCurrent}>My Account</span>
      </nav>
      <div style={styles.welcome}>Welcome! Md Rimel</div>
      
      <div style={styles.content}>
        <Sidebar />
        <main style={styles.main}>
          <h2 style={styles.title}>Edit Your Profile</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={profile.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  value={profile.address}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>
            <h3 style={styles.subtitle}>Password Changes</h3>
            <div style={styles.formGroup}>
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                value={profile.currentPassword}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={profile.newPassword}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={profile.confirmPassword}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.buttonGroup}>
              <button type="button" style={styles.cancelButton}>Cancel</button>
              <button type="submit" style={styles.saveButton}>Save Changes</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  nav: {
    marginBottom: '20px',
  },
  navLink: {
    color: '#333',
    textDecoration: 'none',
  },
  navSeparator: {
    margin: '0 5px',
    color: '#999',
  },
  navCurrent: {
    color: '#999',
  },
  welcome: {
    textAlign: 'right',
    marginBottom: '20px',
  },
  content: {
    display: 'flex',
  },
  main: {
    flexGrow: 1,
    marginLeft: '40px',
  },
  title: {
    color: '#e74c3c',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '48%',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  subtitle: {
    marginTop: '20px',
    marginBottom: '10px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  cancelButton: {
    padding: '10px 20px',
    marginRight: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default UserProfile;