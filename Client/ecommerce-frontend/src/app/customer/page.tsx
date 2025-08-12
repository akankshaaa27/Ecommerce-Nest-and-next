'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Headers from '@/app/components/Header';
import { useRouter } from 'next/navigation';

export default function AddCustomer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:3002/customer', {
        name,
        email,
        mobile,
      });

      if (res.status === 201 || res.status === 200) {
        setMessage('Customer added successfully!');
        setName('');
        setEmail('');
        setMobile('');
        setTimeout(() => router.push('/customer/list'), 1500);
      }
    } catch (error) {
      setMessage('Failed to add customer. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Headers />
      
      <div className="max-w-md mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 py-4 px-6">
            <h1 className="text-xl font-bold text-white">Add New Customer</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Adding...' : 'Add Customer'}
            </button>
          </form>
          
          {message && (
            <div className={`px-6 pb-6 ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              <p className="text-sm font-medium text-center">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}