'use client';

import { useEffect, useState } from 'react';
import { product_api, customer_api } from '@/app/api';
import { Product } from '@/app/types';
import ProductCard from '@/app/components/ProductCard';
import Headers from '@/app/components/Header';
import { FiLoader, FiAlertTriangle, FiShoppingBag } from 'react-icons/fi';

export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        product_api.get('/product')
            .then(res => {
                setProducts(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to load products. Please try again later.');
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Headers />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-12">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                        <FiShoppingBag className="h-8 w-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Our Product Collection
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                        Discover high-quality products for all your needs
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <FiLoader className="animate-spin h-12 w-12 text-blue-500" />
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg max-w-2xl mx-auto">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <FiAlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error loading products</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{error}</p>
                                </div>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-lg shadow-sm max-w-2xl mx-auto">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                            <FiShoppingBag className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No products available</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            We're currently updating our inventory. Please check back later.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}