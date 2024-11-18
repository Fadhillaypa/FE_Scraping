// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Sidebar from './admin/component/Sidebar';
import Home from './pages/Home';
import Scraping from './pages/Scraping';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import UserSettings from './pages/UserSettings';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardAdmin from './admin/pages/DashboardAdmin';
import ManageUsers from './admin/pages/ManageUsers';
import ManageScrape from './admin/pages/ManageScrape';
import AdminSettings from './admin/pages/AdminSettings';

// Cek apakah pengguna sudah login
const isAuthenticated = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

// Komponen ProtectedRoute untuk halaman yang membutuhkan autentikasi
const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
    const [loggedIn, setLoggedIn] = useState(isAuthenticated());

    // Update status login saat `isLoggedIn` berubah di `localStorage`
    useEffect(() => {
        const handleStorageChange = () => {
            setLoggedIn(isAuthenticated());
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <Router>
            <div className="App bg-gray-900 text-gray-200 min-h-screen">
                <Routes>
                    {/* Rute default: arahkan ke halaman login jika belum login */}
                    <Route
                        path="/"
                        element={loggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />}
                    />

                    {/* Rute untuk halaman User */}
                    <Route path="/home" element={<ProtectedRoute element={<><Navbar setLoggedIn={setLoggedIn} /><Home /><Footer /></>} />} />
                    <Route path="/scraping" element={<ProtectedRoute element={<><Navbar setLoggedIn={setLoggedIn} /><Scraping /><Footer /></>} />} />
                    <Route path="/profile" element={<ProtectedRoute element={<><Navbar setLoggedIn={setLoggedIn} /><Profile /><Footer /></>} />} />
                    <Route path="/about" element={<><Navbar setLoggedIn={setLoggedIn} /><About /><Footer /></>} />
                    <Route path="/contact" element={<><Navbar setLoggedIn={setLoggedIn} /><Contact /><Footer /></>} />
                    <Route path="/usersettings" element={<ProtectedRoute element={<><Navbar setLoggedIn={setLoggedIn} /><UserSettings /><Footer /></>} />} />
                    <Route path="/login" element={<><Navbar setLoggedIn={setLoggedIn} /><Login /><Footer /></>} />
                    <Route path="/register" element={<><Navbar setLoggedIn={setLoggedIn} /><Register /><Footer /></>} />

                    {/* Rute untuk halaman Admin */}
                    <Route path="/admin/*" element={
                        <ProtectedRoute element={
                            <div className="flex">
                                <Sidebar />
                                <div className="flex-grow bg-gray-900 text-gray-200">
                                    <Routes>
                                        <Route path="dashboard" element={<DashboardAdmin />} />
                                        <Route path="users" element={<ManageUsers />} />
                                        <Route path="managescrape" element={<ManageScrape />} />
                                        <Route path="adminsettings" element={<AdminSettings />} />
                                    </Routes>
                                </div>
                            </div>
                        } />
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
