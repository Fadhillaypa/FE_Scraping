import React, { useState } from 'react';
import '../style/LoginRegister.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '' // Hanya perlu satu field untuk password
    });
    const [message, setMessage] = useState(null); // Menyimpan pesan sukses atau error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/register', { // Ubah URL sesuai endpoint backend Anda
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message || 'Registration successful!');
                setFormData({ name: '', email: '', password: '' }); // Mengosongkan form setelah sukses
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="register-container p-4">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group mb-4">
                    <label htmlFor="name" className="block mb-2 text-white">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter your name"
                        required
                    />
                </div>
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
                <button type="submit" className="submit-btn">Register</button>
            </form>
            {message && <p className="message">{message}</p>} {/* Menampilkan pesan sukses/error */}
        </div>
    );
};

export default Register;
