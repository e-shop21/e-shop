import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import SignUp from './components/SignUp&Login/SignUp';
import SignIn from './components/SignUp&Login/SignIn';
import UserProfile from './components/User/UserProfile';
import Cart from './components/User/Cart';
import OneProduct from './components/Product/OneProduct';
import SellerProfile from './components/Seller/SellerProfile';
import SellerDashboard from './components/Seller/SellerDashboard';
import CreateProduct from './components/Seller/CreateProduct';
import ProductList from './components/Seller/ProductList';
import CategoryPage from './components/CategoryPage';
import UserOrders from './components/User/UserOrders';
import Wishlist from './components/User/Wishlist';
import AdminDashboard from './components/Admin/AdminDashboard ';

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
          <Route path="/signin" element={<SignIn />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<OneProduct />} />
          <Route path="/seller/profile" element={<SellerProfile />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/create-product" element={<CreateProduct />} />
          <Route path="/seller/product-list" element={<ProductList />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/category/:categoryId/:subCategoryId" element={<CategoryPage />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/orders" element={<UserOrders />} />
          <Route path="/user/wishlist" element={<Wishlist />} />
          <Route path="/admin/*" element={<AdminDashboard />} />  
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;