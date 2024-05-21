import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Current() {
    const [prod, setProd] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        // Fetch all products
        fetch('http://localhost:3001/products')
            .then(response => response.json())
            .then(data => setProd(data))
            .catch(error => console.log("Error occurred during fetch"));
    }, []);

    // Logic for displaying current products
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = prod.slice(indexOfFirstItem, indexOfLastItem);

    // Logic for pagination
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(prod.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='flex'>
            <div className="bg-zinc-300 w-1/4 min-h-screen p-4">
                <h1 className='text-3xl font-semibold mb-4'>Inventory Admin</h1>
                <ul className="space-y-2">
                    <li>
                        <Link to="/current" className="block py-2 px-4 bg-fuchsia-50 rounded">Current Products</Link>
                    </li>
                    <li>
                        <Link to="/Add" className="block py-2 px-4 hover:bg-fuchsia-50 rounded">Add Product</Link>
                    </li>
                    <li>
                        <Link to="/Update" className="block py-2 px-4 hover:bg-fuchsia-50 rounded">Update Product</Link>
                    </li>
                    <li>
                        <Link to="/Dashboard" className="block py-2 px-4 hover:bg-fuchsia-50 rounded">View Dashboard</Link>
                    </li>
                </ul>
            </div>
            <div className='bg-blue-200 w-3/4 min-h-screen p-8'>
            <Link to="/" className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</Link>
                <h1 className='text-3xl font-semibold mb-4'>Product Table</h1>
                <table className='w-full border-collapse border border-gray-800'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='border border-gray-800 px-4 py-2'>Product Name</th>
                            <th className='border border-gray-800 px-4 py-2'>Expiry Date</th>
                            <th className='border border-gray-800 px-4 py-2'>Perishable</th>
                            <th className='border border-gray-800 px-4 py-2'>Quantity</th>
                            <th className='border border-gray-800 px-4 py-2'>Delivery Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(product => (
                            <tr key={product.id} className='hover:bg-gray-100'>
                                <td className='border border-gray-800 px-4 py-2'>{product.name}</td>
                                <td className='border border-gray-800 px-4 py-2'>{product.expiry_date}</td>
                                <td className='border border-gray-800 px-4 py-2'>{product.perishable}</td>
                                <td className='border border-gray-800 px-4 py-2'>{product.quantity}</td>
                                <td className='border border-gray-800 px-4 py-2'>{product.delivery_status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination links */}
                <div className="flex justify-center mt-4">
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${
                                currentPage === number ? 'bg-blue-700' : ''
                            }`}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Current;
