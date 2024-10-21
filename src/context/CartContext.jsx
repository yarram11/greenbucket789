"use client";

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.soupName === item.soupName);
      if (existingItem) {
        // If item already exists in the cart, update quantity
        return prevItems.map((cartItem) =>
          cartItem.soupName === item.soupName
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      // Otherwise, add new item with quantity 1
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (soupName) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.soupName === soupName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (soupName) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.soupName === soupName) {
          if (item.quantity === 1) {
            // If quantity is 1, remove the item from the cart
            return null; // Mark for removal
          } else {
            // Decrease the quantity
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item; // Return other items unchanged
      }).filter(item => item !== null); // Filter out any marked for removal
    });
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
