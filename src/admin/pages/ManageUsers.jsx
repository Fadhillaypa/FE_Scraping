// src/pages/ManageUsers.js
import React, { useState } from 'react';

const ManageUsers = () => {
    const initialUsers = [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', role: 'User' },
        { id: 3, name: 'Alice Johnson', email: 'alicejohnson@example.com', role: 'User' },
    ];

    const [users, setUsers] = useState(initialUsers);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editData, setEditData] = useState({ name: '', email: '', role: '' });

    const filteredUsers = users.filter((user) => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startEditing = (user) => {
        setEditingId(user.id);
        setEditData({ name: user.name, email: user.email, role: user.role });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const saveEdit = (id) => {
        setUsers(users.map(user => 
            user.id === id ? { ...user, ...editData } : user
        ));
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    return (
        <div style={{ width: '100%', maxWidth: '900px' }} className="input-card p-4">
            <h1 className="text-2xl font-bold text-white">Manage Users</h1>
            <p className="text-gray-300">Manage and edit user details here.</p>

            {/* Search input */}
            <input
                type="text"
                placeholder="Search by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-4 mb-6 p-2 w-full max-w-md border border-gray-600 rounded-md bg-[#171E28] text-white placeholder-gray-500"
            />

            <div className="w-full max-w-4xl mx-auto overflow-x-auto">
                <table className="min-w-full border border-gray-600">
                    <thead className="bg-gradient-to-b from-[#15212D] to-[#082e36]">
                        <tr>
                            <th className="border border-gray-600 px-4 py-2 text-white">ID</th>
                            <th className="border border-gray-600 px-4 py-2 text-white">Name</th>
                            <th className="border border-gray-600 px-4 py-2 text-white">Email</th>
                            <th className="border border-gray-600 px-4 py-2 text-white">Role</th>
                            <th className="border border-gray-600 px-4 py-2 text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#171E28]">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-[#105C6E] transition duration-300">
                                <td className="border border-gray-600 px-4 py-2 text-white">{user.id}</td>
                                
                                {editingId === user.id ? (
                                    <>
                                        <td className="border border-gray-600 px-4 py-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={editData.name}
                                                onChange={handleEditChange}
                                                className="p-1 rounded-md w-full bg-[#171E28] text-white placeholder-gray-500"
                                            />
                                        </td>
                                        <td className="border border-gray-600 px-4 py-2">
                                            <input
                                                type="email"
                                                name="email"
                                                value={editData.email}
                                                onChange={handleEditChange}
                                                className="p-1 rounded-md w-full bg-[#171E28] text-white placeholder-gray-500"
                                            />
                                        </td>
                                        <td className="border border-gray-600 px-4 py-2">
                                            <input
                                                type="text"
                                                name="role"
                                                value={editData.role}
                                                onChange={handleEditChange}
                                                className="p-1 rounded-md w-full bg-[#171E28] text-white placeholder-gray-500"
                                            />
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="border border-gray-600 px-4 py-2 text-white">{user.name}</td>
                                        <td className="border border-gray-600 px-4 py-2 text-white">{user.email}</td>
                                        <td className="border border-gray-600 px-4 py-2 text-white">{user.role}</td>
                                    </>
                                )}
                                
                                <td className="border border-gray-600 px-4 py-2 text-white">
                                    {editingId === user.id ? (
                                        <>
                                            <button
                                                onClick={() => saveEdit(user.id)}
                                                className="px-2 py-1 mr-2 bg-green-500 rounded text-white"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="px-2 py-1 bg-red-500 rounded text-white"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => startEditing(user)}
                                            className="px-2 py-1 bg-blue-500 rounded text-white"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-400">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
