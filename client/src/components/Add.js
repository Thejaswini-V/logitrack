import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Add() {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [name, setName] = useState('');
    const [expiry_date, setexpiry_date] = useState('');
    const [quantity, setQuantity] = useState('');
    const [perishable, setPerishable] = useState(false);
    const [delivery_status, setdelivery_status] = useState('pending');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('excelFile', file);

            const response = await axios.post('http://localhost:3001/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setUploadStatus(response.data.message);
        } catch (error) {
            console.error(error);
            setUploadStatus('Error uploading Excel file');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/products', {
                name,
                expiry_date,
                quantity,
                perishable,
                delivery_status,
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error adding product:', error);
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
                        <Link to="/add" className="block py-2 px-4  bg-fuchsia-50 rounded">Add Product</Link>
                    </li>
                    <li>
                        <Link to="/Update" className="block py-2 px-4 hover:bg-fuchsia-50 rounded">Update Product</Link>
                    </li>
                    <li>
                        <Link to="/Dashboard" className="block py-2 px-4 hover:bg-fuchsia-50 rounded">View Dashboard</Link>
                    </li>
                </ul>
            </div>
            <div className='bg-blue-200 w-3/4 min-h-screen p-8 relative'>
            <Link to="/" className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</Link>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-7">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiry_date">
                            Expiry Date:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="expiry_date" type="date" value={expiry_date} onChange={(e) => setexpiry_date(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="perishable">
                            Perishable:
                        </label>
                        <input className="form-checkbox" type="checkbox" checked={perishable} onChange={() => setPerishable(!perishable)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                            Quantity:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="quantity" type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="delivery_status">
                            Delivery Status:
                        </label>
                        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="delivery_status" value={delivery_status} onChange={(e) => setdelivery_status(e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
                <div className="container">
                    <h1>Excel File Upload</h1>
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                    <button onClick={handleUpload} disabled={!file}>
                        Upload
                    </button>
                    {uploadStatus && <p>{uploadStatus}</p>}
                </div>
            </div>
        </div>
    );
}

export default Add;
