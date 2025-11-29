import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Favorites = () => {
  const { favorites, removeFromFavorites, getFavoritesCount } = useContext(FavoritesContext);
  const { addToCart, getCartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (product) => addToCart(product);
  const handleRemoveFavorite = (productId) => removeFromFavorites(productId);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 select-none">
      {/* Header / Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 w-full px-2">
        {/* Page Title */}
        <div className="mt-8 mb-6">
          <h2 className="text-3xl font-bold">My Favorites</h2>
          <p className="text-gray-600 mt-2">
            {getFavoritesCount()} {getFavoritesCount() === 1 ? 'item' : 'items'} in your favorites
          </p>
        </div>

        {/* Favorites Content */}
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-2xl font-semibold mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-6">
              Start adding products to your favorites by clicking the heart icon
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between relative group hover:shadow-lg transition"
              >
                {/* Remove from Favorites */}
                <button
                  onClick={() => handleRemoveFavorite(product.id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 z-10"
                  aria-label="Remove from Favorites"
                  title="Remove from Favorites"
                >
                  ❤
                </button>

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="mb-4 object-contain h-48 mx-auto"
                  loading="lazy"
                />

                {/* Rating */}
                <div className="mb-3 flex justify-center gap-1 text-yellow-400 text-sm">
                  {'★★★★★'.slice(0, Math.round(product.rating?.rate || 0))}
                </div>

                {/* Product Title */}
                <h4 className="font-medium mb-2 truncate" title={product.title}>
                  {product.title}
                </h4>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-400">
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

export default Favorites;
