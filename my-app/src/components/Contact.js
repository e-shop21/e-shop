import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    alert('Thank you for your message!');
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#f8f9fa',
      borderRadius: '20px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    },
    title: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#3a3a3a',
      fontSize: '28px',
    },
    content: {
      display: 'flex',
      backgroundColor: '#fff',
      borderRadius: '15px',
      overflow: 'hidden',
    },
    contactInfo: {
      backgroundColor: '#db4444', // Changed to light red
      color: '#fff',
      padding: '30px',
      width: '40%',
      borderRadius: '15px 0 0 15px',
    },
    contactForm: {
      padding: '30px',
      width: '60%',
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
    },
    icon: {
      marginRight: '10px',
      fontSize: '18px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      color: '#555',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '14px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      height: '120px',
      fontSize: '14px',
    },
    button: {
      backgroundColor: '#db4444', // Changed to light red
      color: '#fff',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s',
    },
  };

  return (
    <div style={styles.container}>
    
      <div style={styles.content}>
        <div style={styles.contactInfo}>
          <h2>Contact Information</h2>
          <p>We'd love to hear from you!</p>
          <div style={styles.infoItem}>
            <span style={styles.icon}>📞</span>
            <span>+1 (123) 456-7890</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.icon}>✉️</span>
            <span>contact@example.com</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.icon}>📍</span>
            <span>Techno Pole Ghazela, Ariana, Tunisia </span>
          </div>
        </div>
        <form onSubmit={handleSubmit} style={styles.contactForm}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            style={styles.textarea}
          ></textarea>
          <button type="submit" style={styles.button}>Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;