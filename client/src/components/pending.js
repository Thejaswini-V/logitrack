import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Pending() {
    const [pendingProducts, setPendingProducts] = useState([]);

    useEffect(() => {
        fetchPendingProducts();
    }, []);

    const fetchPendingProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/products');
            const products = response.data.filter(product => product.delivery_status === 'pending');
            setPendingProducts(products);
        } catch (error) {
            console.error('Error fetching pending products:', error);
        }
    };

    return (
        <div className="flex">
            <div className="bg-zinc-300 w-1/4 min-h-screen p-4">
                <h1 className="text-3xl font-semibold mb-4">Delivery Panel</h1>
                <ul className="space-y-2">
                    <li>
                        <Link to="/Delpg" className="block py-2 px-4 hover:bg-fuchsia-50 rounded">Past deliveries</Link>
                    </li>
                    <li>
                        <Link to="/Pending" className="block py-2 px-4 bg-fuchsia-50 rounded">Pending deliveries</Link>
                    </li>
                    
                </ul>
            </div>
            <div className="bg-blue-200 w-3/4 min-h-screen p-8">
                <Link to="/" className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</Link>
                <h1 className="text-3xl font-semibold mb-4">Pending Products</h1>
                <table className="w-full border-collapse border border-gray-800">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-800 px-4 py-2">Product Name</th>
                            <th className="border border-gray-800 px-4 py-2">Expiry Date</th>
                            <th className="border border-gray-800 px-4 py-2">Perishable</th>
                            <th className="border border-gray-800 px-4 py-2">Quantity</th>
                            <th className="border border-gray-800 px-4 py-2">Delivery Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingProducts.map(product => (
                            <tr key={product.id} className="hover:bg-gray-100">
                                <td className="border border-gray-800 px-4 py-2">{product.name}</td>
                                <td className="border border-gray-800 px-4 py-2">{product.expiry_date}</td>
                                <td className="border border-gray-800 px-4 py-2">{product.perishable ? 'Yes' : 'No'}</td>
                                <td className="border border-gray-800 px-4 py-2">{product.quantity}</td>
                                <td className="border border-gray-800 px-4 py-2">{product.delivery_status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Pending;
