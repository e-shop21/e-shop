import React from 'react';

function NewArrivals() {
  const containerStyle = {
    margin: '2rem 0',
    paddingBottom: '2rem', // Add some padding at the bottom
    backgroundColor: '#f7f7f7', // Light grey background
    padding: '2rem', // Add padding for spacing
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'repeat(3, 1fr)', // Adjusted to 3 rows for better alignment
    gap: '1.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const commonStyle = {
    backgroundColor: '#ffffff',
    padding: '1rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const sectionAStyle = {
    ...commonStyle,
    gridRow: 'span 3', // Span 3 rows to match the combined height of sections B and C/D
    height: '100%', // Make it span the full height of three rows
  };

  const sectionBStyle = {
    ...commonStyle,
    height: '100%', // Make it span the full height of one row
  };

  const sectionCDContainerStyle = {
    gridColumn: '2',
    gridRow: 'span 2', // Span 2 rows to match Section A
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginTop: '1.5rem', // Add margin-top to create space from Section B
  };

  const sectionCDStyle = {
    ...commonStyle,
    height: '100%', // Make it span the full height of one row
  };

  const nameStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  };

  return (
    <section style={containerStyle}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>New Arrivals</h2>
      <div style={gridStyle}>
        <div style={sectionAStyle}>
          <h3 style={nameStyle}>Section A</h3>
          <p>Large Square</p>
        </div>
        <div style={sectionBStyle}>
          <h3 style={nameStyle}>Section B</h3>
          <p>Top Rectangle</p>
        </div>
        <div style={sectionCDContainerStyle}>
          <div style={sectionCDStyle}>
            <h3 style={nameStyle}>Section C</h3>
            <p>Bottom Left Square</p>
          </div>
          <div style={sectionCDStyle}>
            <h3 style={nameStyle}>Section D</h3>
            <p>Bottom Right Square</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;