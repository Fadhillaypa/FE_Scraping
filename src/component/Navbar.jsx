// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = ({ setLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Jika perlu mengirim cookies
            });

            if (response.ok) {
                localStorage.removeItem('isLoggedIn'); // Menghapus status login
                setLoggedIn(false); // Memperbarui status login di App
                navigate('/login'); // Arahkan ke halaman login
            } else {
                // Menangani kesalahan jika logout gagal
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred while logging out:', error);
        }
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-gray-800">
            <div className="flex-shrink-0 flex items-center">
                <Link to="/" aria-label="Tautan ke beranda" className="ml-10">
                    <img
                        src={logo}
                        alt="Logo ScrapeNesia"
                        className="w-12 h-12 sm:h-12"
                    />
                </Link>
                <span className="text-white text-xl font-bold ml-16">ScrapeNesia</span>
            </div>

            <div className="hidden md:flex items-center space-x-4 mr-10">
                <Link to="/home" className="text-white hover:bg-gray-700 rounded-md py-2 px-4">Home</Link>
                <Link to="/scraping" className="text-white hover:bg-gray-700 rounded-md py-2 px-4">Scraping</Link>
                <Link to="/about" className="text-white hover:bg-gray-700 rounded-md py-2 px-4">About Us</Link>
                <Link to="/contact" className="text-white hover:bg-gray-700 rounded-md py-2 px-4">Contact</Link>
            </div>

            <div className="flex items-center">
                <button onClick={handleLogout} className="bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 ml-2">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
