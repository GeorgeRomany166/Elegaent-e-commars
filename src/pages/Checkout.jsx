import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Checkout = () => {
  const { cart, updateQuantity, getSubtotal, getShippingCost, getTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    useDifferentBilling: false,
    paymentMethod: 'card',
    cardNumber: '',
    expirationDate: '',
    cvc: '',
  });

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'jenkatemw') {
      setAppliedCoupon('JenkateMW');
      setDiscount(25);
    } else if (couponCode) {
      alert('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    setCouponCode('');
  };

  const getFinalTotal = () => {
    return getTotal() - discount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      items: cart,
      subtotal: getSubtotal(),
      shipping: getShippingCost(),
      discount: discount,
      total: getFinalTotal(),
      customerInfo: formData,
      orderDate: new Date().toISOString(),
      orderNumber: Math.floor(Math.random() * 1000000),
    };
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    clearCart();
    navigate('/order-complete');
  };

  if (cart.length === 0) {
    return (
      <div className="w-full px-2 font-sans text-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full font-sans text-gray-900 bg-white">
      {/* Header */}
      <div className="px-6 lg:px-20">
        <Navbar />
      </div>

      {/* Page Title and Progress */}
      <div className="text-center py-10 px-6">
        <h2 className="text-4xl md:text-5xl font-medium mb-10">Check Out</h2>
        <div className="flex items-center justify-center gap-3 max-w-2xl mx-auto">
          {/* Step 1 - Completed */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-medium hidden sm:inline">Shopping cart</span>
          </div>
          <div className="w-12 sm:w-20 h-0.5 bg-green-500"></div>
          
          {/* Step 2 - Current */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-medium">2</div>
            <span className="text-sm font-medium hidden sm:inline">Checkout details</span>
          </div>
          <div className="w-12 sm:w-20 h-0.5 bg-gray-300"></div>
          
          {/* Step 3 - Upcoming */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-medium">3</div>
            <span className="text-sm text-gray-400 hidden sm:inline">Order complete</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Shipping Address</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black bg-white appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem'
                    }}
                  >
                    <option value="">Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Town / City *</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Town / City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">State</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Zip Code"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    id="differentBilling"
                    name="useDifferentBilling"
                    checked={formData.useDifferentBilling}
                    onChange={handleChange}
                    className="w-4 h-4 border-gray-300 rounded"
                  />
                  <label htmlFor="differentBilling" className="text-sm text-gray-600">
                    Use a different billing address (optional)
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Payment method</h3>
              <div className="space-y-4">
                {/* Card Payment Option */}
                <div className="border border-gray-300 rounded-lg p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="flex-grow text-sm font-medium">Pay by Card Credit</span>
                    <div className="flex gap-1">
                      <svg className="w-8 h-6" viewBox="0 0 32 24" fill="none">
                        <rect width="32" height="24" rx="3" fill="#252525"/>
                      </svg>
                    </div>
                  </label>
                </div>
                

                {/* Card Details - Show when card is selected */}
                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 1234 1234 1234"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Expiration Date</label>
                        <input
                          type="text"
                          name="expirationDate"
                          placeholder="MM/YY"
                          value={formData.expirationDate}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">CVC</label>
                        <input
                          type="text"
                          name="cvc"
                          placeholder="CVC code"
                          value={formData.cvc}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Paypal Option */}
                <div className="border border-gray-300 rounded-lg p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Paypal</span>
                  </label> 
                  <br></br>
                  {/* Cash On Delivery */}
<label className="flex items-center space-x-3">
  <input
    type="radio"
    name="paymentMethod"
    value="cod"
    checked={formData.paymentMethod === "cod"}
    onChange={handleChange}
    className="h-5 w-5 text-blue-600"
  />
  <span>Cash on Delivery</span>
</label>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-md hover:bg-gray-800 transition font-medium text-base"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-gray-300 rounded-lg p-6 sticky top-6">
            <h3 className="text-xl font-semibold mb-6">Order summary</h3>
            
            {/* Cart Items */}
            <div className="space-y-6 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-semibold mb-1">{item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}</h4>
                    <p className="text-xs text-gray-500 mb-2">Color: {item.color || 'Black'}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-sm border-x border-gray-300">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Input"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-grow border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition text-sm font-medium"
                >
                  Apply
                </button>
              </div>
              
              {/* Applied Coupon */}
              {appliedCoupon && (
                <div className="mt-3 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">{appliedCoupon}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-semibold">-${discount.toFixed(2)}</span>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-red-500 text-xs hover:text-red-700"
                    >
                      [Remove]
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Price Summary */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-3">
                <span>Total</span>
                <span>${getFinalTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Elegant.</h2>
              <p className="text-gray-400 text-sm">Gift & Decoration Store</p>
            </div>
            <nav className="flex gap-8 text-sm">
              <a href="/" className="hover:text-gray-300 transition">Home</a>
              <a href="#" className="hover:text-gray-300 transition">Shop</a>
              <a href="#" className="hover:text-gray-300 transition">Product</a>
              <a href="#" className="hover:text-gray-300 transition">Blog</a>
              <a href="#" className="hover:text-gray-300 transition">Contact Us</a>
            </nav>
          </div>
        </div>
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs">Copyright © 2023 Elegant. All rights reserved</p>
            <div className="flex gap-6 text-xs text-gray-400">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Use</a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;
