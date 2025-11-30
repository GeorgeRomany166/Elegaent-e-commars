  import React, { useState, useEffect, useContext } from 'react';
  import axios from 'axios';
  import { Swiper, SwiperSlide } from "swiper/react";
  import { Navigation, Autoplay } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  import { CartContext } from '../context/CartContext';
  import { FavoritesContext } from '../context/FavoritesContext';
  import { useNavigate } from 'react-router-dom';
  import Navbar from '../components/Navbar';
  import Image from "../assets/jewelry-product-photograph-formats.webp";
  import Image2 from "../assets/depositphotos_223901236-stock-photo-flat-lay-different-wireless-devices.jpg";
  import creative from '../assets/creative.png';
  import el from '../assets/el.png';
    const Home = () => {
      // State for products fetched from API
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      
      // Cart context
      const { addToCart, getCartCount } = useContext(CartContext);
      
      // Favorites context
      const { toggleFavorite, isFavorite, getFavoritesCount } = useContext(FavoritesContext);
      
      const navigate = useNavigate();

      const features = [
        { icon: '🚚', title: 'Free Shipping', subtitle: 'Order above $200' },
        { icon: '💰', title: 'Money-back', subtitle: '33 days guarantee' },
        { icon: '🔒', title: 'Secure Payments', subtitle: 'Secured by Stripe' },
        { icon: '📞', title: '24/7 Support', subtitle: 'Phone and Email support' },
      ];

      // const articles = [
      //   {
      //     title: '///////',
      //     image:
      //       'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=60',
      //     url: '#',
      //   },
      //   {
      //     title: '///////',
      //     image:
      //       'https://images.unsplash.com/photo-1505692794405-0a7f8ee7b91e?auto=format&fit=crop&w=600&q=60',
      //     url: '#',
      //   },
      //   {
      //     title: ' //////',
      //     image:
      //       'https://images.unsplash.com/photo-1501070919279-c01a0a3d2a8d?auto=format&fit=crop&w=600&q=60',
      //     url: '#',
      //   },
      // ];
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
      // Using public FakeStoreAPI endpoint (no key)
      axios
        .get('https://fakestoreapi.com/products')
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Failed to fetch products');
          setLoading(false);
        });
    }, []);

      if (loading)
        return (
          <div className="text-center py-10 text-gray-600 font-semibold">Loading products...</div>
        );
      if (error)
        return (
          <div className="text-center py-10 text-red-600 font-semibold">{error}</div>
        );

      return (
        <div className="w-full px-2 font-sans text-gray-900 select-none">
          
          {/* Header / Navbar */}
          <Navbar />

          {/* Hero Slider */}
        <section className="relative h-[850px] w-full overflow-hidden">

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
        Simply Unique
        <span className="text-transparent bg-gradient-to-r from-white/90 to-gray-400 bg-clip-text">/</span>
        <br />
        Simply Better.
      </h2>

      <p className="text-lg mt-4 text-gray-200">
        <strong>Elegant</strong> is a gift & decorations store based in Cairo City, Egypt.  
        Est since 2019.
      </p>
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



        {/* Categories */}
    <section className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Men's Clothing */}
      <div className="bg-gray-100 p-1 rounded-lg cursor-pointer hover:shadow-lg transition relative">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=60"
          alt="Men's Clothing"
          className="rounded-lg w-full h-[270px] object-cover"
        />
        
          <a
      onClick={(e) => {
        e.preventDefault();
        navigate("/Shop"); // نفس المسار اللي كان في الـ href
      }}
      className="absolute bottom-6 left-6 text-[0.8rem] font-semibold text-black border-b border-black inline-flex items-center gap-1 cursor-pointer"
    >
     Men's Clothing →
    </a>
      </div> 

      {/* Women's Clothing */}
      <div className="bg-gray-100 p-1 rounded-lg cursor-pointer hover:shadow-lg transition relative">
        <img
          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=60"
          alt="Women's Clothing"
          className="rounded-lg w-full h-[270px] object-cover"
        />
        
          <a
      onClick={(e) => {
        e.preventDefault();
        navigate("/Shop"); // نفس المسار اللي كان في الـ href
      }}
      className="absolute bottom-6 left-6 text-[0.8rem] font-semibold text-black border-b border-black inline-flex items-center gap-1 cursor-pointer"
    >
     Women's Clothing →
    </a>
      </div> 

      {/* Jewelry */}
      <div className="bg-gray-100 p-1 rounded-lg cursor-pointer hover:shadow-lg transition relative">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=60"
          alt="Jewelry"
          className="rounded-lg w-full h-[270px] object-cover"
        />
      
          <a
      onClick={(e) => {
        e.preventDefault();
        navigate("/Shop"); // نفس المسار اللي كان في الـ href
      }}
      className="absolute bottom-6 left-6 text-[0.8rem] font-semibold text-black border-b border-black inline-flex items-center gap-1 cursor-pointer"
    >
      Jewelry →
    </a>
      </div>

      {/* Electronics */}
      <div className="bg-gray-100 p-1 rounded-lg cursor-pointer hover:shadow-lg transition relative">
        <img
          src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=60"
          alt="Electronics"
          className="rounded-lg w-full h-[270px] object-cover"
        />
    
          <a
      onClick={(e) => {
        e.preventDefault();
        navigate("/Shop"); // نفس المسار اللي كان في الـ href
      }}
      className="absolute bottom-6 left-6 text-[0.8rem] font-semibold text-black border-b border-black inline-flex items-center gap-1 cursor-pointer"
    >
      Electronics →
    </a>
      </div>
    </section>

  {/* New Arrivals*/}
  <section className="mt-20">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold">New Arrivals</h3>
       <a
      onClick={(e) => {
        e.preventDefault();
        navigate("/shop"); // ← حط الصفحة اللي عايز تروح لها
      }}
      className="text-sm text-gray-700 font-semibold hover:text-black inline-flex items-center gap-1 cursor-pointer"
    >
      More Products →
    </a>
    </div>

    {/* Swiper Slider */}
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      spaceBetween={20}
      breakpoints={{
        320: { slidesPerView: 1.5 },
        640: { slidesPerView: 2.5 },
        1024: { slidesPerView: 4 },
      }}
    >
      {products.length === 0 && <div>No products available</div>}

      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <div 
            className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between relative group cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >

            <div className="flex justify-between items-center mb-1">
              <span className="text-white bg-green-500 text-xs font-semibold px-2 py-1 rounded">NEW</span>
              <span className="text-white bg-green-500 text-xs font-semibold px-2 py-1 rounded ml-auto">-50%</span>
              <button 
                aria-label="Add to Favorites" 
                className={`ml-2 transition ${isFavorite(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product);
                }}
              >
                {isFavorite(product.id) ? '❤' : '♡'}
              </button>
            </div>

            <img
              src={product.image}
              alt={product.title}
              className="mb-4 object-contain h-36 mx-auto"
              loading="lazy"
            />

            <div className="mb-3 flex justify-center gap-1 text-yellow-400 text-sm">
              {'★★★★★'.slice(0, Math.round(product.rating.rate))}
            </div>

            <h4 className="font-medium mb-1 truncate">{product.title}</h4>

            <div className="mb-4">
              <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white px-4 py-2 rounded transition-opacity"
            >
              Add to cart
            </button>

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
          {/* Features Section */}
          <section className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-gray-700">
            {features.map(({ icon, title, subtitle }, idx) => (
              <div
                key={idx}
                className="p-6 border border-gray-200 rounded-lg bg-gray-50 flex flex-col items-center gap-3"
              >
                <div className="text-4xl">{icon}</div>
                <h5 className="font-semibold">{title}</h5>
                <p className="text-sm">{subtitle}</p>
              </div>
            ))}
          </section>

          {/* Promotional Section */}
  <section className="mt-24 flex flex-col md:flex-row items-center gap-10 bg-[#f3f5f7] max-w-[90%] mx-auto w-full">

            <img
              src={creative }
              alt="Living room setup"
              className="rounded-lg w-full md:w-1/2 max-h-[450px] object-cover"
              loading="lazy"
            />
            <div className="md:w-1/2">
              <p className="text-sm text-blue-600 uppercase font-semibold mb-2">
                Sale up to 35% off
              </p>
              <h3 className="text-3xl font-bold mb-6">
                HUNDREDS of <br />
                New lower prices!
              </h3>
              <p className="text-gray-700 mb-6">
                It's more affordable than ever to give what ever you wanted
              </p>
              <a
      onClick={(e) => {
        e.preventDefault();
        navigate("/shop");
      }}
      className="text-sm font-semibold underline hover:text-black inline-flex items-center gap-1 cursor-pointer"
    >
      Shop Now →
    </a>
            </div>
          </section>

          {/* Articles
          <section className="mt-24">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">Articles</h3>
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-black underline flex items-center gap-1"
              >
                More Articles →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map(({ title, image, url }, i) => (
                <article
                  key={i}
                  className="rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
                >
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">{title}</h4>
                    <a href={url} className="text-sm hover:text-black inline-flex items-center gap-1">
                      Read More →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section> */}

          {/* Newsletter Signup */}
    <section
    className="mt-24 relative bg-gray-50 rounded-lg p-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-cover bg-center h-[450px]"
     style={{
     backgroundImage: `url(${el})`
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
          <footer className="mt-20 bg-black text-gray-400 px--2" >
            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
              <div className="text-white font-semibold text-lg tracking-tight">Elegant.</div>
              <div className="text-sm">Gift & Decoration Store</div>
              <nav className="space-x-6 text-sm">
                <a onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition font-medium cursor-pointer">Home</a>
                <a href="#" className="text-gray-400 hover:text-white transition font-medium">Shop</a>
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
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:underline">
                Terms of Use
              </a>
            </div>
          </footer>
        </div>
      );
    };

    export default Home;


