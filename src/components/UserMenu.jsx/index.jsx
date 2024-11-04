"use client";
import React, { useState } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa'; // Import the login icon

const UserMenu = ({ isScrolled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isLoaded } = useUser();
    const clerk = useClerk();
    const router = useRouter();

    const handleSignOut = async () => {
        await clerk.signOut();
        router.push('/'); // Redirect to home page after sign out
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`relative ${isScrolled ? "bg-[#4caf50]" : "bg-white"} p-2 rounded-md shadow-lg`}>
            <button onClick={toggleMenu} className="flex items-center justify-center w-8 h-8 text-gray-700 hover:text-blue-600 transition">
                {isLoaded ? (user ? user.firstName.charAt(0).toUpperCase() : <FaUser className="text-3xl" />) : '?'} {/* Increased icon size */}
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 w-48 bg-white shadow-lg rounded-md mt-2">
                    <div className="px-4 py-2 text-gray-800">
                        {user ? `Hello, ${user.firstName}` : 'Guest'}
                    </div>
                    <div className="border-t border-gray-300"></div>
                    {user ? (
                        <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100">
                            Sign Out
                        </button>
                    ) : (
                        <button onClick={() => clerk.openSignIn()} className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-100">
                            Sign In
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserMenu;
