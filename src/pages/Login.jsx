import React, { useState } from 'react';
import '../style/LoginRegister.css';
import axios from 'axios'; // Pastikan axios sudah diinstall
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Inisialisasi useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login data:', formData);
        
        // Menentukan URL API berdasarkan logika email admin
        const apiUrl = formData.email.includes('@admin.com')
            ? 'http://localhost:8000/api/admin/login' // API untuk admin
            : 'http://localhost:8000/api/login'; // API untuk user

        try {
            const response = await axios.post(apiUrl, formData);
            console.log('Login successful:', response.data);
            
            // Simpan status login di localStorage
            localStorage.setItem('isLoggedIn', 'true');

            // Navigasi ke halaman sesuai jenis pengguna setelah login berhasil
            if (formData.email.includes('@admin.com')) {
                navigate('/admin/dashboard'); // Halaman dashboard admin
            } else {
                navigate('/home'); // Halaman home untuk user
            }
            
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Login failed');
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="login-container p-4">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group mb-4">
                    <label htmlFor="email" className="block mb-2 text-white">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="password" className="block mb-2 text-white">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Login</button>
            </form>
            <p className="mt-4 text-white">
                Belum punya akun? 
                <a href="/register" className="text-blue-400"> Daftar di sini</a>
            </p>
        </div>
    );
};

export default Login;
