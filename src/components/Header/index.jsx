"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MdOutlinePhone } from 'react-icons/md';
import { FaUser } from 'react-icons/fa'; // User icon for login
import { BiShoppingBag } from 'react-icons/bi'; // Cart icon
import CartPopup from './CartPopup';
import { useCart } from '@/context/CartContext';
import UserMenu from '../UserMenu.jsx/index';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
    const { cartItems, getCartCount } = useCart();

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const openCartPopup = () => setIsCartPopupOpen(true);
    const closeCartPopup = () => setIsCartPopupOpen(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isCartPopupOpen && !event.target.closest(".cart-popup")) {
                closeCartPopup();
            }
        };

        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCartPopupOpen]);

    return (
        <header className={`w-full fixed top-0 left-0 z-50 h-16 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"} flex items-center justify-between px-6`}>
            <div className="logo">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        width={100}
                        height={100}
                        alt="logo"
                        priority
                        className="object-contain"
                    />
                </Link>
            </div>

            <nav className="flex-grow flex justify-center">
                <ul className="flex space-x-8">
                    {['Home', 'About', 'Menu', 'Blog', 'Contact'].map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className={`hover:text-blue-500 transition ${isScrolled ? 'text-black' : 'text-white'}`}
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="flex items-center space-x-6">
                <span className="ml-6 flex items-center">
                    <MdOutlinePhone className="mr-2" />
                    +91-9887776666
                </span>

                <div className="flex items-center space-x-4">
                    {/* Cart Icon with badge */}
                    <div className={`relative p-2 rounded-md shadow-lg ${isScrolled ? "bg-[#4caf50]" : "bg-white"}`}>
                        <button onClick={openCartPopup}>
                            <BiShoppingBag className="text-2xl text-gray-700 hover:text-blue-600 transition" />
                            <span className="absolute top-[-5px] right-[-10px] flex items-center justify-center w-4 h-4 bg-blue-300 text-white rounded-full">
                                {getCartCount()}
                            </span>
                        </button>
                    </div>

              

                    {/* Pass isScrolled prop to UserMenu */}
                    <UserMenu isScrolled={isScrolled} />
                </div>
            </div>

            {isCartPopupOpen && (
                <div className="absolute top-16 right-6 cart-popup z-50">
                    <CartPopup cartItems={cartItems} closeCartPopup={closeCartPopup} />
                </div>
            )}
        </header>
    );
};

export default Header;
