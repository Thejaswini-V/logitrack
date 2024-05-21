import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [productQuantities, setProductQuantities] = useState([]);
    const chartRef = useRef(null); // Ref to store the chart instance

    useEffect(() => {
        fetchProductQuantities();
    }, []);

    const fetchProductQuantities = async () => {
        try {
            const response = await axios.get('http://localhost:3001/dashboard');
            setProductQuantities(response.data);
        } catch (error) {
            console.error('Error fetching product quantities:', error);
        }
    };

    useEffect(() => {
        // Destroy the chart instance before rendering a new one
        if (chartRef.current !== null) {
            chartRef.current.destroy();
        }
        renderChart();
    }, [productQuantities]); // Re-render the chart when productQuantities change

    const renderChart = () => {
        // Extract product names and quantities for chart data
        const chartData = {
            labels: productQuantities.map(product => product.name),
            datasets: [
                {
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                    hoverBorderColor: 'rgba(75, 192, 192, 1)',
                    data: productQuantities.map(product => product.quantity),
                },
            ],
        };

        // Render the chart
        const ctx = document.getElementById('myChart');
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        display: false // Hide legend
                    }
                }
            },
        });
    };

    return (
        <div className="flex h-screen">
            {/* Side Navbar */}
            <div className="bg-zinc-300 w-1/4 min-h-screen p-4">
                <h1 className="text-3xl font-semibold mb-4">Inventory Admin</h1>
                <ul className="space-y-2">
                    <li>
                        <Link to="/current" className="block py-2 px-4 hover:bg-fuchsia-50 rounded">Current Products</Link>
                    </li>
                    <li>
                        <Link to="/Add" className="block py-2 px-4 hover:bg-fuchsia-50 rounded">Add Product</Link>
                    </li>
                    <li>
                        <Link to="/Update" className="block py-2 px-4 hover:bg-fuchsia-50 rounded">Update Product</Link>
                    </li>
                    <li>
                        <Link to="/Dashboard" className="block py-2 px-4 bg-fuchsia-50 rounded">View Dashboard</Link>
                    </li>
                </ul>
            </div>
            {/* Main Content */}
            <div className="bg-gradient-to-br from-purple-400 to-indigo-600 w-3/4 min-h-screen flex justify-center items-center">
            <Link to="/" className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</Link>
                <div className="w-3/4 h-3/4">
                    <h1 className="text-3xl font-semibold text-white mb-4">Product Dashboard</h1>
                    <div className="bg-white shadow-md rounded p-4 h-full">
                        {/* Render the chart */}
                        <canvas id="myChart" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
