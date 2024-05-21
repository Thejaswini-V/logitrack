import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Update() {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [updateData, setUpdateData] = useState({
        name: '',
        expiry_date: '',
        perishable: false,
        delivery_status: 'pending',
        quantity: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleProductSelect = (productId) => {
        setSelectedProductId(productId);
        const selectedProduct = products.find(product => product.id === productId);
        if (selectedProduct) {
            setUpdateData({
                name: selectedProduct.name,
                expiry_date: selectedProduct.expiry_date,
                perishable: selectedProduct.perishable,
                delivery_status: selectedProduct.delivery_status,
                quantity: selectedProduct.quantity
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setUpdateData({ ...updateData, [name]: newValue });
    };

    const handleUpdate = async () => {
        try {
            // Set a default value for delivery_status if it's not provided or if it's null
            const updatedData = {
                name: updateData.name,
                expiry_date: updateData.expiry_date,
                perishable: updateData.perishable,
                delivery_status: updateData.delivery_status || 'pending', // Default value is 'pending'
                quantity: updateData.quantity
            };
    
            await axios.put(`http://localhost:3001/products/${selectedProductId}`, updatedData);
            // Assuming you have a function to fetch updated products from the server
            fetchProducts();
            // Clear selected product and update data after successful update
            setSelectedProductId('');
            setUpdateData({
                name: '',
                expiry_date: '',
                perishable: false,
                delivery_status: 'pending',
                quantity: ''
            });
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    
    return (
        <div className='flex'>
            <div className="bg-zinc-300 w-1/4 min-h-screen p-4">
                <h1 className='text-3xl font-semibold mb-4'>Inventory Admin</h1>
                <ul className="space-y-2">
                    <li>
                        <Link to="/current" className="block py-2 px-4  hover:bg-fuchsia-50 rounded">Current Products</Link>
                    </li>
                    <li>
                        <Link to="/add" className="block py-2 px-4  hover:bg-fuchsia-50 rounded">Add Product</Link>
                    </li>
                    <li>
                        <Link to="/update" className="block py-2 px-4 bg-fuchsia-50 rounded">Update Product</Link>
                    </li>
                    <li>
                        <Link to="/Dashboard" className="block py-2 px-4 hover:bg-fuchsia-50 rounded">View Dashboard</Link>
                    </li>
                </ul>
            </div>
            <div className='bg-blue-200 w-3/4 min-h-screen p-8'>
            <Link to="/" className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</Link>
                <h1 className='text-3xl font-semibold mb-4'>Update Product</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productId">
                        Select Product:
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="productId"
                        value={selectedProductId}
                        onChange={(e) => handleProductSelect(e.target.value)}
                    >
                        <option value="">Select a product...</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedProductId && (
                    <form onSubmit={handleUpdate} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                name="name"
                                value={updateData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiry_date">
                                Expiry Date:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="expiry_date"
                                type="date"
                                name="expiry_date"
                                value={updateData.expiry_date}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="perishable">
                                Perishable:
                            </label>
                            <input
                                type="checkbox"
                                id="perishable"
                                name="perishable"
                                checked={updateData.perishable}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                                Quantity:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="quantity"
                                type="number"
                                name="quantity"
                                value={updateData.quantity}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="delivery_status">
                                Delivery Status:
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="delivery_status"
                                name="delivery_status"
                                value={updateData.delivery_status}
                                onChange={handleInputChange}
                            >
                                <option value="pending">Pending</option>
                                <option value="delivered">Delivered</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Update;
