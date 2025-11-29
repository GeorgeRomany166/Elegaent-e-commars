import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeItem,
    shippingOption,
    setShippingOption,
    getSubtotal,
    getTotal,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');

  const handleCheckout = () => navigate('/checkout');

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 p-1">
      {/* Header / Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full px-5">
        {/* Page Title */}
        <div className="text-center py-12">
          <h2 className="text-5xl font-bold mb-8">Cart</h2>
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                1
              </div>
              <span className="font-semibold text-black">Shopping cart</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-semibold">
                2
              </div>
              <span className="text-gray-400">Checkout details</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-semibold">
                3
              </div>
              <span className="text-gray-400">Order complete</span>
            </div>
          </div>
        </div>

        {/* Cart Content */}
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate('/')}
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-center pb-6 border-b border-gray-200">
                  {/* Product Info */}
                  <div className="col-span-5 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-contain bg-gray-50 rounded"
                    />
                    <div>
                      <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-500">Color: {item.category}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-gray-500 hover:text-red-600 mt-2 flex items-center gap-1"
                      >
                        <span>✕</span> Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-4 py-1 border-x border-gray-300">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center font-semibold">
                    ${item.price.toFixed(2)}
                  </div>

                  {/* Subtotal */}
                  <div className="col-span-3 text-right font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-6">Cart summary</h3>
                {/* Shipping Options */}
                <div className="space-y-3 mb-6">
                  <label className="flex items-center justify-between p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value="free"
                        checked={shippingOption === 'free'}
                        onChange={(e) => setShippingOption(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Free shipping</span>
                    </div>
                    <span className="text-sm font-semibold">$0.00</span>
                  </label>
                  <label className="flex items-center justify-between p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingOption === 'express'}
                        onChange={(e) => setShippingOption(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Express shipping</span>
                    </div>
                    <span className="text-sm font-semibold">+$15.00</span>
                  </label>
                  <label className="flex items-center justify-between p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value="pickup"
                        checked={shippingOption === 'pickup'}
                        onChange={(e) => setShippingOption(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Pick Up</span>
                    </div>
                    <span className="text-sm font-semibold">%21.00</span>
                  </label>
                </div>

                {/* Subtotal & Total */}
                <div className="flex justify-between py-3 border-t border-gray-200">
                  <span className="text-sm">Subtotal</span>
                  <span className="font-semibold">${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-4 border-t border-gray-300 text-lg font-bold">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition font-semibold"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Coupon Section */}
        {cart.length > 0 && (
          <div className="max-w-7xl mx-auto py-12">
            <h3 className="text-xl font-semibold mb-2">Have a coupon?</h3>
            <p className="text-gray-600 text-sm mb-4">Add your code for an instant cart discount</p>
            <div className="flex gap-3 max-w-md">
              <div className="flex-grow relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🎟️</span>
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition font-semibold">
                Apply
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-black text-gray-400">
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

export default Cart;
