// src/pages/Scraping.js
import React from 'react';

const Scraping = () => {
    const data = [
        { id: 1, title: 'Item 1', description: 'Description for Item 1', date: '2024-10-01', action: 'Edit' },
        { id: 2, title: 'Item 2', description: 'Description for Item 2', date: '2024-10-02', action: 'Edit' },
        { id: 3, title: 'Item 3', description: 'Description for Item 3', date: '2024-10-03', action: 'Edit' },
        // Tambahkan data lebih banyak sesuai kebutuhan
    ];

    return (
        <div style={{ width: '100%', maxWidth: '900px' }} className="input-card p-4">
            <h1 className="text-2xl font-bold text-white">Scraping Overview</h1>
            <p className="text-gray-300">Scraping content goes here.</p>

            <div className="w-full max-w-4xl mx-auto overflow-x-auto mt-4"> {/* Kontainer untuk tabel */}
                <table className="min-w-full border border-gray-600">
                    <thead className="bg-gradient-to-b from-[#15212D] to-[#082e36]">
                        <tr>
                            <th className="border border-gray-600 px-4 py-2 text-white">ID</th>
                            <th className="border border-gray-600 px-4 py-2 text-white">Title</th>
                            <th className="border border-gray-600 px-4 py-2 text-white">Description</th>
                            <th className="border border-gray-600 px-4 py-2 text-white">Date</th>
                            <th className="border border-gray-600 px-4 py-2 text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#171E28]">
                        {data.map((item) => (
                            <tr key={item.id} className="hover:bg-[#105C6E] transition duration-300">
                                <td className="border border-gray-600 px-4 py-2 text-white">{item.id}</td>
                                <td className="border border-gray-600 px-4 py-2 text-white">{item.title}</td>
                                <td className="border border-gray-600 px-4 py-2 text-white">{item.description}</td>
                                <td className="border border-gray-600 px-4 py-2 text-white">{item.date}</td>
                                <td className="border border-gray-600 px-4 py-2 text-white">{item.action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Scraping;
