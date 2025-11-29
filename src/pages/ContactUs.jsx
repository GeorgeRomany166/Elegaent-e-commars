import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';
import Navbar from '../components/Navbar';
 import creative from '../assets/creative.png';
const ContactUs = () => {
  const navigate = useNavigate();
  const { getCartCount } = useContext(CartContext);
  const { getFavoritesCount } = useContext(FavoritesContext);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully! We will get back to you soon.');
    setFormData({ fullName: '', email: '', message: '' });
  };

  // SVG Icons Components
  const StoreIcon = () => (
    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  const EmailIcon = () => (
    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const TruckIcon = () => (
    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  );

  const MoneyIcon = () => (
    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const LockIcon = () => (
    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  const SupportIcon = () => (
    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );

  const features = [
    { IconComponent: TruckIcon, title: 'Free Shipping', subtitle: 'Order above $200' },
    { IconComponent: MoneyIcon, title: 'Money-back', subtitle: '30 days guarantee' },
    { IconComponent: LockIcon, title: 'Secure Payments', subtitle: 'Secured by Stripe' },
    { IconComponent: SupportIcon, title: '24/7 Support', subtitle: 'Phone and Email support' },
  ];

  return (
    <div className="w-full px-2 font-sans text-gray-900 select-none">
      {/* Header / Navbar */}
      <Navbar />

      {/* Breadcrumb */}
      <div className="py-4 text-sm text-gray-600">
        <span onClick={() => navigate('/')} className="cursor-pointer hover:text-black">Home</span>
        <span className="mx-2">›</span>
        <span className="text-black font-semibold">Contact Us</span>
      </div>

      {/* Hero Section */}
      <section className="mt-8 mb-16 max-w-[70%] mx-auto w-full ">
        <h2 className="text-5xl font-normal leading-tight mb-6 max-w-3xl ">
At Elegant, we’re passionate about bringing you the latest in fashion and electronics.        </h2>
        <p className="text-gray-600 max-w-3xl leading-relaxed font-light">
Whether you’re shopping for yourself or looking for the perfect gift, our team is ready to assist you with any questions or guidance you need.
Contact us anytime—we love helping our customers look and feel their best.        </p>
      </section>

      {/* About Us Section */}
      <section className="mt-16 mb-20 flex flex-col md:flex-row gap-10 items-center bg-gray-50 rounded-lg overflow-hidden max-w-[90%] mx-auto w-full">
        <div className="md:w-1/2">
          <img
            src={creative}
            alt="creative Elegent"
            className="w-full h-[400px] object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8">
          <h3 className="text-3xl font-normal mb-4">About Us</h3>
          <p className="text-gray-600 mb-4 font-light">
            Elegant is a gift store 
          </p>
          <p className="text-gray-600 mb-6 font-light">
            Our customer service is always prepared to support you 24/7
          </p>
          <button 
            onClick={() => navigate('/')}
            className="text-sm font-normal text-black border-b-2 border-black hover:text-gray-700 hover:border-gray-700 transition inline-flex items-center gap-2"
          >
            Shop Now →
          </button>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="mt-20 mb-16">
        <h3 className="text-4xl font-normal text-center mb-12">Contact Us</h3>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Address */}
          <div className="text-center p-6">
            <div className="text-gray-700 mb-4">
              <StoreIcon />
            </div>
            <h4 className="font-semibold text-xs uppercase text-gray-500 mb-3 tracking-wider">ADDRESS</h4>
            <p className="text-gray-700 font-light">123 stre cairo, Egypt,</p>
            <p className="text-gray-700 font-light">Elegent</p>
          </div>

          {/* Contact */}
          <div className="text-center p-6">
            <div className="text-gray-700 mb-4">
              <PhoneIcon />
            </div>
            <h4 className="font-semibold text-xs uppercase text-gray-500 mb-3 tracking-wider">CONTACT US</h4>
            <p className="text-gray-700 font-light">+12345678</p>
          </div>

          {/* Email */}
          <div className="text-center p-6">
            <div className="text-gray-700 mb-4">
              <EmailIcon />
            </div>
            <h4 className="font-semibold text-xs uppercase text-gray-500 mb-3 tracking-wider">EMAIL</h4>
            <p className="text-gray-700 font-light">hello@elegant.com</p>
          </div>
        </div>

        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message"
                  required
                  rows="6"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none text-gray-900"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md font-normal hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
            <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.8001462741655!2d31.213597515489217!3d30.04441918188025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145841c1bb12345%3A0xabcdef1234567890!2z2KfZhNin2YTYtNin2Kkg2YTYp9mE2LnYqQ!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg" 

              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Elegant Store Location"
            ></iframe>
            {/* Location Pin Overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none">
              <div className="bg-black text-white rounded-full p-3 shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-24 mb-16 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        {features.map(({ IconComponent, title, subtitle }, idx) => (
          <div
            key={idx}
            className="p-8 bg-gray-50 flex flex-col items-center gap-4"
          >
            <div className="text-gray-700">
              <IconComponent />
            </div>
            <h5 className="font-normal text-gray-900 text-lg">{title}</h5>
            <p className="text-sm text-gray-600 font-light">{subtitle}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-20 bg-black text-gray-400 ">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div className="text-white font-semibold text-lg tracking-tight">Elegant.</div>
          <div className="text-sm">Gift & Decoration Store</div>
          <nav className="space-x-6 text-sm">
            <a onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition font-medium cursor-pointer">Home</a>
            <a href="#" className="text-gray-400 hover:text-white transition font-medium">Shop</a>
            <a onClick={() => navigate('/contact')} className="text-gray-400 hover:text-white transition font-medium cursor-pointer">Contact Us</a>
          </nav>
          <div className="flex space-x-4 text-lg">
            <a href="#" aria-label="Instagram" className="hover:text-white">📸</a>
            <a href="#" aria-label="Facebook" className="hover:text-white">📘</a>
            <a href="#" aria-label="YouTube" className="hover:text-white">📺</a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-4 py-6 text-center text-xs text-gray-600">
          Copyright © 2023 Elegant. All rights reserved
          <span className="mx-2">|</span>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a href="#" className="hover:underline">Terms of Use</a>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
