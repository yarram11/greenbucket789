"use client";
import React from 'react';
import { BiX } from 'react-icons/bi';
import { useCart } from '@/context/CartContext'; // Ensure this path is correct

const CheckoutPopup = ({ closeCheckoutPopup }) => {
  const { cartItems } = useCart(); // Use the context

  // Function to calculate the total price
  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0; // Update this based on your logic
    const discount = 28; // Example discount; replace with actual coupon logic if necessary

    const total = subtotal + shipping - discount;
    return { subtotal, shipping, discount, total };
  };

  const { subtotal, shipping, discount, total } = calculateTotal();

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full h-full overflow-y-auto">
        <button
          onClick={closeCheckoutPopup}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
        >
          <BiX className="text-2xl" />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">Billing & Shipping Address</h2>

        {/* Form for billing and shipping address */}
        <form className="space-y-4">
          <input type="text" placeholder="First Name" className="border w-full p-2" required />
          <input type="text" placeholder="Last Name" className="border w-full p-2" required />
          <input type="text" placeholder="Company Name" className="border w-full p-2" />
          <input type="text" placeholder="Address" className="border w-full p-2" required />
          <input type="text" placeholder="Apartment, suite, unit etc." className="border w-full p-2" />
          <input type="text" placeholder="Town / City" className="border w-full p-2" required />
          <input type="text" placeholder="State / County" className="border w-full p-2" />
          <input type="text" placeholder="Postcode / Zip" className="border w-full p-2" />
          <input type="email" placeholder="Email" className="border w-full p-2" required />
          <input type="tel" placeholder="Phone" className="border w-full p-2" required />
          <textarea placeholder="Notes about your order" className="border w-full p-2 h-24" />
        </form>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-center">Your Order</h2>

        {/* Order Summary */}
        <div className="overflow-y-auto h-40">
          {cartItems.length === 0 ? (
            <p className="text-center">Your cart is empty!</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between mb-4 border-b py-2">
                <img src={item.imageSrc} alt={item.soupName} className="w-16 h-16 object-cover" />
                <span>{item.soupName}</span>
                <span>₹{item.price} x {item.quantity}</span>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-between mt-4 font-bold">
          <span>Order Subtotal:</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Shipping:</span>
          <span>₹{shipping}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Coupon:</span>
          <span>-₹{discount}</span>
        </div>
        <div className="flex justify-between mt-4 font-bold">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>

        {/* Payment Method Section */}
        <h2 className="text-2xl font-semibold mt-6 mb-4 text-center">Payment Method</h2>
        <input type="text" placeholder="Name on Card" className="border w-full p-2 mb-2" required />
        <select className="border w-full p-2 mb-2" required>
          <option value="">Select Credit Card Type</option>
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
          <option value="Amex">American Express</option>
        </select>
        <input type="text" placeholder="Credit Card Number" className="border w-full p-2 mb-2" required />
        <input type="text" placeholder="Card Verification Number" className="border w-full p-2 mb-4" required />

        <button 
          onClick={() => alert("Order placed!")} // Placeholder action for order placement
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPopup;
