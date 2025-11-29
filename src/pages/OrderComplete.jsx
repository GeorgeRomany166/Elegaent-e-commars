import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderComplete = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      setOrderData(JSON.parse(lastOrder));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!orderData) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="w-full px-6 font-sans text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between py-5 border-b border-gray-300">
        <h1 className="text-2xl font-bold tracking-tight cursor-pointer" onClick={() => navigate('/')}>
          Elegant.
        </h1>
        <nav className="space-x-8 text-sm font-semibold text-gray-700 flex items-center">
          {['Home', 'Shop', 'Product', 'Contact Us'].map((item) => (
            <a key={item} href={item === 'Home' ? '/' : '#'} className="hover:text-black transition">
              {item}
            </a>
          ))}
        </nav>
        <div className="flex space-x-6 text-gray-600 text-lg cursor-pointer">
          <button aria-label="Search">🔍</button>
          <button aria-label="User Account">👤</button>
          <button aria-label="Shopping Cart" onClick={() => navigate('/cart')}>🛒</button>
        </div>
      </header>

      {/* Page Title */}
      <div className="text-center py-12">
        <h2 className="text-5xl font-bold mb-8">Complete!</h2>
        
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
              ✓
            </div>
            <span className="font-semibold text-black">Shopping cart</span>
          </div>
          <div className="w-16 h-0.5 bg-black"></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
              ✓
            </div>
            <span className="font-semibold text-black">Checkout details</span>
          </div>
          <div className="w-16 h-0.5 bg-black"></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
              3
            </div>
            <span className="font-semibold text-black">Order complete</span>
          </div>
        </div>
      </div>

      {/* Order Confirmation */}
      <div className="max-w-3xl mx-auto py-12 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-4xl">✓</span>
          </div>
          <h3 className="text-3xl font-bold mb-4">Thank you! 🎉</h3>
          <p className="text-xl text-gray-600 mb-2">Your order has been received</p>
          <p className="text-gray-500">Order #{orderData.orderNumber}</p>
        </div>

        {/* Order Items */}
        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            {orderData.items.slice(0, 4).map((item) => (
              <div key={item.id} className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain bg-white rounded-lg border border-gray-200"
                />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
            ))}
            {orderData.items.length > 4 && (
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 font-semibold">+{orderData.items.length - 4}</span>
              </div>
            )}
          </div>

          <div className="space-y-3 text-left max-w-md mx-auto">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold">${orderData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-semibold">${orderData.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-3">
              <span>Total:</span>
              <span>${orderData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-gray-50 rounded-lg p-8 mb-8 text-left">
          <h4 className="font-semibold text-lg mb-4">Shipping Information</h4>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Name:</strong> {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}
            </p>
            <p>
              <strong>Email:</strong> {orderData.customerInfo.email}
            </p>
            <p>
              <strong>Phone:</strong> {orderData.customerInfo.phone}
            </p>
            <p>
              <strong>Address:</strong> {orderData.customerInfo.address}, {orderData.customerInfo.city},{' '}
              {orderData.customerInfo.state} {orderData.customerInfo.zipCode}, {orderData.customerInfo.country}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition font-semibold"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => window.print()}
            className="border border-black text-black px-8 py-3 rounded-md hover:bg-gray-100 transition font-semibold"
          >
            Print Receipt
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          A confirmation email has been sent to {orderData.customerInfo.email}
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-20 bg-black text-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div className="text-white font-semibold text-lg tracking-tight">Elegant.</div>
          <div className="text-sm">Gift & Decoration Store</div>
          <nav className="space-x-6 text-sm">
            {['Home', 'Shop', 'Product', 'Blog', 'Contact Us'].map((item) => (
              <a
                href="#"
                key={item}
                className="text-gray-400 hover:text-white transition font-medium"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="border-t border-gray-800 mt-4 py-6 text-center text-xs text-gray-600">
          © Copyright 2023 Elegant. All rights reserved.
          <span className="mx-2">|</span>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a href="#" className="hover:underline">Terms of Use</a>
        </div>
      </footer>
    </div>
  );
};

export default OrderComplete;
