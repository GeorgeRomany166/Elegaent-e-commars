import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';
import Navbar from '../components/Navbar';
import Image from "../assets/jewelry-product-photograph-formats.webp";
import Image2 from "../assets/depositphotos_223901236-stock-photo-flat-lay-different-wireless-devices.jpg";
  


const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [minRating, setMinRating] = useState(0);
  const [categories, setCategories] = useState([]);

  const { addToCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();
const [index, setIndex] = useState(1);

  const images = [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1600&q=80",
    Image,
  Image2
  ];

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const auto = setInterval(nextSlide, 2000);
    return () => clearInterval(auto);
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/products/categories')
        ]);

        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);
        setCategories(['all', ...categoriesResponse.data]);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Rating filter
    filtered = filtered.filter(product => product.rating.rate >= minRating);

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy, priceRange, minRating]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleFavorite = (e, product) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  if (loading) {
    return (
      <div className="w-full px-2 font-sans text-gray-900 select-none">
        <Navbar />
        <div className="text-center py-10 text-gray-600 font-semibold">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-2 font-sans text-gray-900 select-none">
        <Navbar />
        <div className="text-center py-10 text-red-600 font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full px-2 font-sans text-gray-900 select-none">
      <Navbar />

      {/* Header */}
       <section className="relative h-[650px] w-full overflow-hidden">

    {/* Slider Images */}
    <div className="absolute inset-0">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="Slider"
          className={`absolute inset-0 w-full h-full   object-cover transition-opacity duration-700 ${
            index === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/50"></div>

    {/* TEXT ON RIGHT */}
    <div className="absolute left-12 top-1/2 -translate-y-1/2 text-white max-w-xl text-right">
      <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
        Shop
        <span className="text-transparent bg-gradient-to-r from-white/90 to-gray-400 bg-clip-text">/</span>
        <br />
       Discover our amazing collection of products
      </h2>

    </div>
    {/* Indicators */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
      {images.map((_, i) => (
        <span
          key={i}
          className={`w-8 h-1 rounded-full transition ${
            index === i ? "bg-white" : "bg-gray-400"
          }`}
        ></span>
      ))}
    </div>
  </section>
    
      {/* Filters and Search */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Rating</label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value={0}>All Ratings</option>
              <option value={1}>1+ Stars</option>
              <option value={2}>2+ Stars</option>
              <option value={3}>3+ Stars</option>
              <option value={4}>4+ Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <div className="flex gap-4 items-center">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">{filteredProducts.length} products found</p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Product Image */}
              <div className="relative mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain"
                  loading="lazy"
                />
                <button
                  onClick={(e) => handleToggleFavorite(e, product)}
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition ${
                    isFavorite(product.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
                  }`}
                >
                  {isFavorite(product.id) ? '❤' : '♡'}
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm line-clamp-2">{product.title}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400 text-sm">
                    {'★★★★★'.split('').map((star, i) => (
                      <span key={i}>{i < Math.round(product.rating.rate) ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.rating.count})</span>
                </div>

                {/* Price */}
                <p className="text-lg font-bold">${product.price.toFixed(2)}</p>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition opacity-0 group-hover:opacity-100"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 bg-black text-gray-400 px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div className="text-white font-semibold text-lg tracking-tight">Elegant.</div>
          <div className="text-sm">Gift & Decoration Store</div>
          <nav className="space-x-6 text-sm">
            <a onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition font-medium cursor-pointer">Home</a>
            <a onClick={() => navigate('/shop')} className="text-gray-400 hover:text-white transition font-medium cursor-pointer">Shop</a>
            <a href="#" className="text-gray-400 hover:text-white transition font-medium">Product</a>
            <a href="#" className="text-gray-400 hover:text-white transition font-medium">Blog</a>
            <a onClick={() => navigate('/contact')} className="text-gray-400 hover:text-white transition font-medium cursor-pointer">Contact Us</a>
          </nav>
          <div className="flex space-x-4 text-lg">
            <a href="#" aria-label="Facebook" className="hover:text-white">📘</a>
            <a href="#" aria-label="Instagram" className="hover:text-white">📸</a>
            <a href="#" aria-label="Pinterest" className="hover:text-white">📌</a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-4 py-6 text-center text-xs text-gray-600">
          © Copyright 2024. All rights reserved.
          <span className="mx-2">|</span>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a href="#" className="hover:underline">Terms of Use</a>
        </div>
      </footer>
    </div>
  );
};

export default Shop;
