import React from 'react';

function About() {
  const teamMembers = [
    { name: 'Yesser Laabidi', role: 'Founder & Chairman', image: 'https://scontent.ftun2-2.fna.fbcdn.net/v/t1.6435-9/66670479_2957026184338635_8368437171425640448_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=dBGR2HpyBJwQ7kNvgEQkgYi&_nc_ht=scontent.ftun2-2.fna&_nc_gid=AKG076vW3-0kciil7MazHL3&oh=00_AYB7Tm_uWvwRkzuJLiAPo2hnXScyAY9xtLhE--hYVCFmJA&oe=670F471A' },
    { name: 'Wael Ratel', role: 'Managing Director', image: 'https://avatars.githubusercontent.com/u/129957067?v=4' },
    { name: 'Abdelmajid Nciri', role: 'Cyber Security', image: 'https://media.discordapp.net/attachments/1210920786781544478/1285151201989623860/received_3870108806559093.jpeg?ex=66e939d3&is=66e7e853&hm=1aca4a2ffc179a3078f6ff104b880784a4c00df6a2a3eedc8aa10a312a301742&=&format=webp&width=625&height=638' },
    { name: 'Dali gharbi', role: 'Product Designer', image: 'https://media.discordapp.net/attachments/1282675028936233021/1285149444433776682/IMG_2031.jpg?ex=66e93830&is=66e7e6b0&hm=8f4f23b2441172223a1344962226e9c09e778c7ce94a271c2ddedc69396e50b8&=&format=webp&width=933&height=638' },
    
  ];

  const features = [
    { icon: '🛒', text: 'Sellers across our site' },
    { icon: '💰', text: 'Monthly Product Sale' },
    { icon: '📦', text: 'Active Customers' },
    { icon: '🔒', text: 'Secure Payment' },
  ];

  return (
    <div className="about-container">
      <div className="story-section">
        <div className="story-text">
          <h1>Our Story</h1>
          <p>
          Launched in 2015, TechnoPole Ghazela of Ariana, Tunisia, is a hub for technological innovation and development. Our team of dedicated web developers—Ratel Wael, Yesser Laabidi, Abdelmajid Nciri, and Dali Gharbi—has crafted and continuously refined this cutting-edge website. With a commitment to excellence and a passion for technology, we strive to deliver exceptional digital solutions and services. Our collective expertise drives the creation of dynamic and user-friendly platforms, supporting businesses and enhancing online experiences across the region.
          </p>
          <p>
            Exclusive , our website has more than 1 Million products to offer, growing at a 
            very fast pace. Exclusive offers a diverse assortment in categories 
            ranging from consumer.
          </p>
        </div>
        <div className="story-image">
          <img src="https://media.wired.com/photos/5c9040ee4950d24718d6da99/1:1/w_1800,h_1800,c_limit/shoppingcart-1066110386.jpg" alt="Happy shoppers" />
        </div>
      </div>


      <div className="team-section">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <img src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726444800&semt=ais_hybrid" alt="Twitter" />
              </a>
              <a href="#" className="social-icon">
                <img src="https://png.pngtree.com/element_our/sm/20180630/sm_5b37de3263964.jpg" alt="Instagram" />
              </a>
              <a href="#" className="social-icon">
                <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png" alt="LinkedIn" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="features-section">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <span className="feature-icon">{feature.icon}</span>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>

      

      <div className="pagination">
        
      </div>

      <style jsx>{`
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
          font-family: 'Arial', sans-serif;
          color: #333;
        }
        .story-section {
          display: flex;
          gap: 4rem;
          margin-bottom: 4rem;
          align-items: center;
        }
        .story-text {
          flex: 1;
        }
        .story-text h1 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: #1a1a1a;
        }
        .story-text p {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .story-image {
          flex: 1;
        }
        .story-image img {
          width: 100%;
          height: auto;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .features-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4rem;
          background-color: #f8f8f8;
          padding: 2rem;
          border-radius: 10px;
        }
        .feature-item {
          text-align: center;
          flex: 1;
        }
        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }
        .feature-item p {
          font-size: 1.1rem;
          font-weight: bold;
        }
        .team-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4rem;
        }
        .team-member {
          text-align: center;
          flex: 1;
          padding: 1rem;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
        }
        .team-member:hover {
          transform: translateY(-10px);
        }
        .team-member img {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 50%;
          margin-bottom: 1rem;
        }
        .team-member h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .team-member p {
          color: #666;
          margin-bottom: 1rem;
        }
        .social-icons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        .social-icon img {
          width: 24px;
          height: 24px;
        }
        .pagination {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }
        .page-dot {
          width: 10px;
          height: 10px;
          background-color: #ccc;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .page-dot.active {
          background-color: #333;
        }
        @media (max-width: 768px) {
          .story-section, .team-section {
            flex-direction: column;
          }
          .features-section {
            flex-wrap: wrap;
          }
          .feature-item {
            flex-basis: 50%;
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default About;