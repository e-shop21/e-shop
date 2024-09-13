import React from 'react';

const Sidebar = () => {
  return (
    <aside style={styles.sidebar}>
      <section>
        <h3 style={styles.sectionTitle}>Manage My Account</h3>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <a href="#" style={styles.activeLink}>My Profile</a>
          </li>
          <li style={styles.listItem}>
            <a href="#" style={styles.link}>Address Book</a>
          </li>
          <li style={styles.listItem}>
            <a href="#" style={styles.link}>My Payment Options</a>
          </li>
        </ul>
      </section>
      <section>
        <h3 style={styles.sectionTitle}>My Orders</h3>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <a href="#" style={styles.link}>My Returns</a>
          </li>
          <li style={styles.listItem}>
            <a href="#" style={styles.link}>My Cancellations</a>
          </li>
        </ul>
      </section>
      <section>
        <h3 style={styles.sectionTitle}>My Wishlist</h3>
      </section>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    paddingRight: '20px',
    borderRight: '1px solid #ddd',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: '10px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
  },
  activeLink: {
    textDecoration: 'none',
    color: '#e74c3c',
    fontWeight: 'bold',
  },
};

export default Sidebar;