'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Headers from '@/app/components/Header';
import { useRouter } from 'next/navigation';

interface Customer {
    id: number;
    name: string;
    email: string;
    mobile: string;
}

export default function CustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await axios.get('http://localhost:3002/customer');
                setCustomers(res.data);
            } catch (err) {
                setError('Failed to fetch customers. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Headers />
            
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Customer Directory</h1>
                    <button
                        onClick={() => router.push('/customer')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
                    >
                        + Add Customer
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center items-center p-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                        </div>
                    ) : error ? (
                        <div className="p-6 text-red-600 text-center font-medium">{error}</div>
                    ) : customers.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-500">No customers found.</p>
                            <button
                                onClick={() => router.push('/customer')}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
                            >
                                Add Your First Customer
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {customers.map((customer, index) => (
                                        <tr key={customer.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.mobile}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}