import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Initialize favorites from localStorage or empty array
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add item to favorites
  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.find((item) => item.id === product.id);
      
      if (!exists) {
        return [...prevFavorites, product];
      }
      return prevFavorites;
    });
  };

  // Remove item from favorites
  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) => 
      prevFavorites.filter((item) => item.id !== productId)
    );
  };

  // Toggle favorite (add if not exists, remove if exists)
  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.find((item) => item.id === product.id);
      
      if (exists) {
        return prevFavorites.filter((item) => item.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  // Check if item is in favorites
  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  // Get favorites count
  const getFavoritesCount = () => {
    return favorites.length;
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        getFavoritesCount,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
