import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import SignUp from './components/SignUp&Login/SignUp';
import UserProfile from './components/User/UserProfile';
import Cart from './components/User/Cart';
import OneProduct from './components/Product/OneProduct';
import SellerProfile from './components/Seller/SellerProfile';
import SellerDashboard from './components/Seller/SellerDashboard';
import CreateProduct from './components/Seller/CreateProduct';
import ProductList from './components/Seller/ProductList';
import CategoryPage from './components/CategoryPage';

function App() {
  return (
    <div className="grid grid-cols-1 gap-8">
      <Header />
      <Navbar />
      <main className="container mx-auto px-4">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<OneProduct />} />
          <Route path="/seller/profile" element={<SellerProfile />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/create-product" element={<CreateProduct />} />
          <Route path="/seller/product-list" element={<ProductList />} />
          <Route path="/category/:categoryId/:subCategoryId" element={<CategoryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;