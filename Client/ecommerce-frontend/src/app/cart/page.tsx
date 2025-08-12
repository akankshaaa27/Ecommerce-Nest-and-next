'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Headers from '@/app/components/Header';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  mobile: string;
}

interface CartItem {
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
}

interface FullCartItem extends CartItem {
  product: Product;
  customer: Customer;
}

export default function CartPage() {
  const [cart, setCart] = useState<FullCartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        const cartRes = await axios.get<CartItem[]>('http://localhost:3001/cart');
        const fullCart = await Promise.all(
          cartRes.data.map(async (item) => {
            const [productRes, customerRes] = await Promise.all([
              axios.get<Product>(`http://localhost:3001/product/${item.productId}`),
              axios.get<Customer>(`http://localhost:3002/customer/${item.customerId}`),
            ]);

            return {
              ...item,
              product: productRes.data,
              customer: customerRes.data,
            };
          })
        );
        setCart(fullCart);
      } catch (err) {
        console.error('Error fetching cart data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleBuyNow = async (item: FullCartItem) => {
    setLoading(true);
    setMessage('');
    try {
      const orderData = {
        productId: item.productId,
        customerId: item.customerId,
        quantity: item.quantity,
      };

      const response = await axios.post('http://localhost:3001/order', orderData);
      setMessage('Order placed successfully!');
      
      // Remove item from cart after successful order
      setCart(cart.filter(cartItem => cartItem.id !== item.id));
    } catch (error) {
      console.error('Failed to place order:', error);
      setMessage('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Headers />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          {cart.length > 0 && (
            <div className="text-xl font-semibold">
              Total: <span className="text-blue-600">₹{calculateTotal()}</span>
            </div>
          )}
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message}
          </div>
        )}

        {loading && cart.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-2 text-gray-500">Start shopping to add items to your cart</p>
            <button
              onClick={() => router.push('/product')}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden bg-gray-100">
                          {/* Product image placeholder */}
                          <div className="h-full w-full flex items-center justify-center text-gray-400">
                            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                          <p className="text-gray-500 text-sm">{item.product.description}</p>
                          <p className="mt-1 text-sm text-gray-500">Customer: {item.customer.name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                      <div className="flex items-center">
                        <span className="text-gray-700 mr-2">Qty:</span>
                        <span className="font-medium">{item.quantity}</span>
                      </div>
                      <div className="text-lg font-medium text-blue-600">
                        ₹{item.product.price * item.quantity}
                      </div>
                      <button
                        onClick={() => handleBuyNow(item)}
                        disabled={loading}
                        className={`px-4 py-2 rounded-md font-medium ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                      >
                        {loading ? 'Processing...' : 'Checkout'}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}