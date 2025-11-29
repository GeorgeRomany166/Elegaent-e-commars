import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getCartCount } = useContext(CartContext);
  const { getFavoritesCount } = useContext(FavoritesContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="flex items-center justify-between py-5 border-b border-gray-300 relative px-6">
      {/* الشمال: العنوان + أيقونات */}
      <div className="flex items-center space-x-4">
        <h1 
          className="text-2xl font-bold tracking-tight select-text cursor-pointer"
          onClick={() => navigate('/')}
        >
          Elegant.
        </h1>

        {/* Desktop Icons */}
        <div className="hidden md:flex space-x-4 text-gray-600 text-lg cursor-pointer">
          <button 
            aria-label="Favorites" 
            title="Favorites"
            onClick={() => navigate('/favorites')}
            className="relative"
          >
            ❤
            {getFavoritesCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getFavoritesCount()}
              </span>
            )}
          </button>
          <button 
            aria-label="Shopping Cart" 
            title="Shopping Cart"
            onClick={() => navigate('/cart')}
            className="relative"
          >
            🛒
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Icons */}
        <div className="flex md:hidden space-x-2 text-gray-600 text-lg cursor-pointer">
          <button 
            aria-label="Favorites" 
            title="Favorites"
            onClick={() => navigate('/favorites')}
            className="relative"
          >
            ❤
            {getFavoritesCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                {getFavoritesCount()}
              </span>
            )}
          </button>
          <button 
            aria-label="Shopping Cart" 
            title="Shopping Cart"
            onClick={() => navigate('/cart')}
            className="relative"
          >
            🛒
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* اليمين: روابط Desktop */}
      <nav className="hidden md:flex space-x-8 text-sm font-semibold text-gray-700 items-center">
        <a onClick={() => navigate('/')} className="hover:text-black transition cursor-pointer">Home</a>
        <a onClick={() => navigate('/shop')} className="hover:text-black transition cursor-pointer">Shop</a>
        <a onClick={() => navigate('/contact')} className="hover:text-black transition cursor-pointer">Contact Us</a>
        <a
          href="/signin"
          className="hover:text-black transition px-4 py-1 border border-gray-700 rounded text-gray-700 hover:bg-gray-200"
        >
          Sign In
        </a>
        <a
          href="/signup"
          className="hover:text-black transition px-4 py-1 border border-gray-700 rounded text-gray-700 hover:bg-gray-200"
        >
          Sign Up
        </a>
      </nav>

      {/* Hamburger Menu - Mobile */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden flex flex-col gap-1.5 z-50 ml-auto"
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-gray-700 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-700 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-300 shadow-lg z-50">
          <nav className="flex flex-col py-4 px-6 space-y-4">
            <a 
              onClick={() => {
                navigate('/');
                setIsMobileMenuOpen(false);
              }} 
              className="text-gray-700 hover:text-black transition cursor-pointer font-semibold py-2 border-b border-gray-200"
            >
              Home
            </a>
            <a
              onClick={() => {
                navigate('/shop');
                setIsMobileMenuOpen(false);
              }}
              className="text-gray-700 hover:text-black transition cursor-pointer font-semibold py-2 border-b border-gray-200"
            >
              Shop
            </a>
            <a 
              onClick={() => {
                navigate('/contact');
                setIsMobileMenuOpen(false);
              }} 
              className="text-gray-700 hover:text-black transition cursor-pointer font-semibold py-2 border-b border-gray-200"
            >
              Contact Us
            </a>
            <div className="flex flex-col space-y-3 pt-2">
              <a
                href="/signin"
                className="text-center hover:text-black transition px-4 py-2 border border-gray-700 rounded text-gray-700 hover:bg-gray-200 font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="text-center hover:text-black transition px-4 py-2 border border-gray-700 rounded text-gray-700 hover:bg-gray-200 font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
