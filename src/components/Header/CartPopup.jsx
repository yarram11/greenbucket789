"use client";
import React, { useState } from 'react'; // Import useState
import Image from 'next/image';
import { BiX } from 'react-icons/bi';
import { useCart } from '@/context/CartContext'; // Ensure this path is correct
import CheckoutPopup from '@/components/Header/Checkout Popup';



const CartPopup = ({ closeCartPopup }) => {
  const { cartItems, increaseQuantity, decreaseQuantity } = useCart(); // Use the context
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // State for managing checkout popup visibility

  return (
    <div className="fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 flex justify-end items-start">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mt-16 mr-4 relative">
        <button
          onClick={closeCartPopup}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
        >
          <BiX className="text-2xl" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty!</p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center mb-4">
                <Image
                  src={item.imageSrc}
                  alt={item.altText}
                  width={50}
                  height={50}
                  className="rounded-md mr-3"
                />
                <div className="flex-grow">
                  <h3 className="text-lg">{item.soupName}</h3>
                  <p className="text-gray-500">₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => increaseQuantity(item.soupName)} // Call increaseQuantity
                    className="text-lg"
                  >
                    +
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => decreaseQuantity(item.soupName)} // Call decreaseQuantity
                    className="text-lg"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <h4 className="text-lg font-bold">Total:</h4>
          <p className="text-lg font-semibold">
            ₹{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </p>
        </div>

        <button 
          onClick={() => setIsCheckoutOpen(true)} // Opens the checkout popup
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500 transition"
        >
          Order Now
        </button>

        {isCheckoutOpen && ( // Conditional rendering for the checkout popup
          <CheckoutPopup 
            closeCheckoutPopup={() => setIsCheckoutOpen(false)} 
            cartItems={cartItems} 
          />
        )}
      </div>
    </div>
  );
};

export default CartPopup;
