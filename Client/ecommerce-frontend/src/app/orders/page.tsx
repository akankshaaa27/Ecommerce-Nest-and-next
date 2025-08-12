'use client';

import { useEffect, useState } from 'react';
import { product_api, customer_api } from '@/app/api';
import Headers from '@/app/components/Header';
import { FiPackage, FiUsers, FiShoppingCart, FiLoader } from 'react-icons/fi';

interface Order {
  id: number;
  productId: number;
  quantity: number;
  customerId: number;
  name: string;
  productName: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderRes = await product_api.get('/order');
        const ordersData = orderRes.data;

        const enrichedOrders = await Promise.all(
          ordersData.map(async (order: any) => {
            let name = 'Unknown';
            let productName = 'Unknown';

            try {
              const customerRes = await customer_api.get(`/customer/${order.customerId}`);
              name = customerRes.data?.name ?? 'Unknown';
            } catch (err) {
              console.error('Customer fetch failed', err);
            }

            try {
              const productRes = await product_api.get(`/product/${order.productId}`);
              productName = productRes.data?.name ?? 'Unknown';
            } catch (err) {
              console.error('Product fetch failed', err);
            }

            return {
              id: order.id,
              productId: order.productId,
              quantity: order.quantity,
              customerId: order.customerId,
              name,
              productName,
            };
          })
        );

        setOrders(enrichedOrders);
      } catch (err) {
        setError('Failed to load orders. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Headers />
      
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FiShoppingCart className="text-blue-600" />
            Order History
          </h1>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="text-sm font-medium text-gray-700">
              Total Orders: <span className="text-blue-600">{orders.length}</span>
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FiLoader className="animate-spin h-8 w-8 text-blue-500" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-red-500">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
              <FiPackage className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
            <p className="mt-2 text-sm text-gray-500">Your order history will appear here once orders are placed.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {order.quantity} {order.quantity === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <FiUsers className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Customer</p>
                        <p className="text-sm text-gray-900">{order.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <FiPackage className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Product</p>
                        <p className="text-sm text-gray-900">{order.productName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}