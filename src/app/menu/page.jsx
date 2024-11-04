"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext"; // Adjust the path if needed
import Image from "next/image"; // Use Next.js Image component

// Sample product data structured similarly to your existing data
const productData = {
  Soup: [
    {
      imageSrc: "/img1.jpg",
      altText: "Veg Soup",
      price: 250,
      itemName: "Veg Soup",
      description: "A delicious blend of fresh vegetables and herbs.",
    },
    {
      imageSrc: "/img2.jpg",
      altText: "Chicken Soup",
      price: 350,
      itemName: "Chicken Soup",
      description: "A warm, hearty chicken broth with spices.",
    },
  ],
  Starters: [
    {
      imageSrc: "/starter1.jpeg",
      altText: "Veg Starter",
      price: 300,
      itemName: "Veg Starter",
      description: "Crispy fried vegetable rolls.",
    },
    {
      imageSrc: "/starter2.png",
      altText: "Chicken Starter",
      price: 400,
      itemName: "Chicken Starter",
      description: "Spicy chicken wings tossed in sauce.",
    },
  ],
  Biryani: [
    {
      imageSrc: "/biryani1.jpeg",
      altText: "Veg Biryani",
      price: 400,
      itemName: "Veg Biryani",
      description: "Aromatic basmati rice cooked with fresh vegetables and spices.",
    },
    {
      imageSrc: "/biryani2.jpeg",
      altText: "Chicken Biryani",
      price: 500,
      itemName: "Chicken Biryani",
      description: "Tender chicken cooked with fragrant basmati rice.",
    },
  ],
  Drinks: [
    {
      imageSrc: "/drink1.jpeg",
      altText: "Lemonade",
      price: 100,
      itemName: "Lemonade",
      description: "Refreshing lemonade to quench your thirst.",
    },
    {
      imageSrc: "/drink2.jpeg",
      altText: "Mango Lassi",
      price: 150,
      itemName: "Mango Lassi",
      description: "Creamy mango yogurt drink.",
    },
  ],
};

const MenuPage = () => {
  const { addToCart } = useCart(); // Use addToCart function from context
  const [selectedCategory, setSelectedCategory] = useState("Soup"); // Set default category

  const categoryIcons = {
    Soup: "🍲",
    Starters: "🍽️",
    Biryani: "🍚",
    Drinks: "🥤",
  };

  return (
    <div className="bg-gray-300 min-h-screen py-8">
      <div className="menu-container">
        {/* Filter Products Section */}
        <section className="filterProducts">
          <ul className="flex flex-wrap justify-center space-x-10">
            {["Soup", "Starters", "Biryani", "Drinks"].map((category) => (
              <li
                key={category}
                className={`text-center cursor-pointer ${selectedCategory === category ? "font-bold text-green-600" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                <span className="text-2xl">{categoryIcons[category]}</span>
                <h4 className="text-lg py-2 mb-0 font-bold">{category.toUpperCase()}</h4>
              </li>
            ))}
          </ul>
        </section>

        {/* Products List */}
        <div className="productsList py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {productData[selectedCategory].map((item) => (
              <div key={item.itemName} className="flex flex-col items-center">
                <div className="product-item">
                  <Image src={item.imageSrc} alt={item.altText} className="product-image" width={300} height={200} />
                  <h4 className="font-semibold">{item.itemName}</h4>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="font-bold">{`₹${item.price}`}</p>
                  <button
                    className="add-to-cart-button hover:bg-green-500 transition duration-300 ease-in-out"
                    aria-label={`Add ${item.itemName} to cart`}
                    onClick={() => addToCart(item)} 
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
