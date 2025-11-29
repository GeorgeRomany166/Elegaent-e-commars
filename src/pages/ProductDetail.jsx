import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';
import Navbar from '../components/Navbar';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getCartCount } = useContext(CartContext);
  const { toggleFavorite, isFavorite, getFavoritesCount } = useContext(FavoritesContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [activeTab, setActiveTab] = useState('reviews');
  const [selectedImage, setSelectedImage] = useState(0);

  // Color options
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'Gray', hex: '#6B7280' },
    { name: 'Red', hex: '#EF4444' },
    { name: 'White', hex: '#FFFFFF' }
  ];

  // Mock reviews
  const reviews = [
    {
      id: 1,
      name: 'Sofia Harvetz',
      rating: 5,
      date: '3 weeks ago',
      text: 'I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos molestias excepturi sint non provident.',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      name: 'Nicolas Jensen',
      rating: 5,
      date: '2 weeks ago',
      text: 'I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos molestias excepturi sint non provident.',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: 3,
      name: 'Nicolas Jensen',
      rating: 5,
      date: '1 week ago',
      text: 'I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos molestias excepturi sint non provident.',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 4,
      name: 'Nicolas Jensen',
      rating: 5,
      date: '5 days ago',
      text: 'I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos molestias excepturi sint non provident.',
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
    {
      id: 5,
      name: 'Nicolas Jensen',
      rating: 5,
      date: '2 days ago',
      text: 'I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos molestias excepturi sint non provident.',
      avatar: 'https://i.pravatar.cc/150?img=5'
    }
  ];

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch product details');
        setLoading(false);
      });
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      alert(`${quantity} item(s) added to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center py-10 text-gray-600 font-semibold">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center py-10 text-red-600 font-semibold">{error || 'Product not found'}</div>
      </div>
    );
  }

  // Mock additional images (using the same image for demo)
  const productImages = [product.image, product.image, product.image];

  return (
    <div className="w-full px-2 font-sans text-gray-900 select-none">
      {/* Header / Navbar */}
      <Navbar />

      {/* Breadcrumb */}
      <div className="py-4 text-sm text-gray-600">
        <span onClick={() => navigate('/')} className="cursor-pointer hover:text-black">Home</span>
        <span className="mx-2">›</span>
        <span className="cursor-pointer hover:text-black">Shop</span>
        <span className="mx-2">›</span>
        <span className="cursor-pointer hover:text-black">Living Room</span>
        <span className="mx-2">›</span>
        <span className="text-black font-semibold">Product</span>
      </div>

      {/* Product Section */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Badge */}
          <div className="relative">
            <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded z-10">
              NEW
            </span>
            <span className="absolute top-4 left-20 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded z-10">
              -50%
            </span>
            
            {/* Main Image */}
            <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center h-[500px]">
              <img
                src={productImages[selectedImage]}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-3 gap-4">
            {productImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`bg-gray-100 rounded-lg p-4 cursor-pointer border-2 ${
                  selectedImage === index ? 'border-black' : 'border-transparent'
                } hover:border-gray-400 transition`}
              >
                <img
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-24 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {'★★★★★'.split('').map((star, i) => (
                <span key={i}>{i < Math.round(product.rating?.rate || 5) ? '★' : '☆'}</span>
              ))}
            </div>
            <span className="text-sm text-gray-600">11 Reviews</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold">{product.title}</h1>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.
          </p>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            <span className="text-xl text-gray-400 line-through">${(product.price * 2).toFixed(2)}</span>
          </div>

          {/* Offer Timer */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Offer expires in:</p>
            <div className="flex gap-4 text-center">
              <div>
                <div className="text-3xl font-bold">02</div>
                <div className="text-xs text-gray-500">Days</div>
              </div>
              <div>
                <div className="text-3xl font-bold">12</div>
                <div className="text-xs text-gray-500">Hours</div>
              </div>
              <div>
                <div className="text-3xl font-bold">45</div>
                <div className="text-xs text-gray-500">Minutes</div>
              </div>
              <div>
                <div className="text-3xl font-bold">05</div>
                <div className="text-xs text-gray-500">Seconds</div>
              </div>
            </div>
          </div>

          {/* Measurements */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Measurements</p>
            <p className="text-gray-900">17 1/2×20 5/8 "</p>
          </div>

          {/* Color Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-700">Choose Color</p>
              <span className="text-sm text-gray-600">{selectedColor}</span>
            </div>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-12 h-12 rounded-full border-2 ${
                    selectedColor === color.name ? 'border-black' : 'border-gray-300'
                  } flex items-center justify-center transition`}
                  title={color.name}
                >
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ 
                      backgroundColor: color.hex,
                      border: color.name === 'White' ? '1px solid #e5e7eb' : 'none'
                    }}
                  ></div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange('decrement')}
                className="px-4 py-3 hover:bg-gray-100 transition"
              >
                −
              </button>
              <span className="px-6 py-3 border-x border-gray-300">{quantity}</span>
              <button
                onClick={() => handleQuantityChange('increment')}
                className="px-4 py-3 hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleFavorite(product)}
              className={`px-6 py-3 border-2 rounded-lg font-semibold transition ${
                isFavorite(product.id)
                  ? 'border-red-500 text-red-500 hover:bg-red-50'
                  : 'border-gray-300 hover:border-black'
              }`}
            >
              {isFavorite(product.id) ? '❤ Wishlist' : '♡ Wishlist'}
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>

          {/* Product Meta */}
          <div className="border-t pt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">SKU</span>
              <span className="font-medium">1117</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">CATEGORY</span>
              <span className="font-medium">Living Room, Bedroom</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="mt-16 mb-16">
        <div className="border-b border-gray-300 mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-4 font-semibold transition ${
                activeTab === 'info'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Additional Info
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`pb-4 font-semibold transition ${
                activeTab === 'questions'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Questions
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 font-semibold transition ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Reviews
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'reviews' && (
          <div>
            {/* Reviews Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">Customer Reviews</h3>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400 text-lg">
                    {'★★★★☆'.split('').map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">11 Reviews</span>
                </div>
              </div>
              <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                Write Review
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-6 mb-8">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{review.name}</h4>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex text-yellow-400 text-sm mb-2">
                        {'★★★★★'.split('').map((star, i) => (
                          <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {review.text}
                      </p>
                      <div className="flex gap-4 text-sm">
                        <button className="text-gray-600 hover:text-black transition">
                          Like
                        </button>
                        <button className="text-gray-600 hover:text-black transition">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <button className="border-2 border-black px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition">
                Load more
              </button>
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="text-gray-600 space-y-4">
            <p><strong>Details & Product Care</strong></p>
            <p>{product.description}</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Premium quality materials</li>
              <li>Designed to last for years</li>
              <li>Easy to clean and maintain</li>
              <li>Eco-friendly production</li>
            </ul>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="text-gray-600">
            <p className="mb-4">Have a question about this product? Ask us!</p>
            <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
              Ask a Question
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="mt-24 mb-16 relative bg-gray-50 rounded-lg p-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-cover bg-center h-[350px]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
        <div className="relative md:w-1/2 z-10">
          <h3 className="text-3xl font-bold mb-3 text-white">Join Our Newsletter</h3>
          <p className="mb-6 text-gray-200">
            Sign up for deals, new products and promotions
          </p>
          <form className="flex gap-3 max-w-md">
            <input
              type="email"
              placeholder="Email address"
              required
              className="border border-white/40 bg-white/20 text-white placeholder-white/70 rounded-md p-3 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
            >
              Signup
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 bg-black text-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div className="text-white font-semibold text-lg tracking-tight">Elegant.</div>
          <div className="text-sm">Gift & Decoration Store</div>
          <nav className="space-x-6 text-sm">
            <a onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition font-medium cursor-pointer">Home</a>
            <a href="#" className="text-gray-400 hover:text-white transition font-medium">Shop</a>
            <a href="#" className="text-gray-400 hover:text-white transition font-medium">Product</a>
            <a href="#" className="text-gray-400 hover:text-white transition font-medium">Blog</a>
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

export default ProductDetail;
