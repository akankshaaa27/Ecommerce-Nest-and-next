'use client';
import { Product } from '@/app/types';
import axios from 'axios';
import { useState } from 'react';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddToCart = async () => {
    const customerIdInput = prompt('Enter your Customer ID:');
    const quantityInput = prompt('Enter quantity:', '1');

    if (!customerIdInput || !quantityInput) return;

    const customerId = parseInt(customerIdInput);
    const quantity = parseInt(quantityInput);

    if (isNaN(customerId) || isNaN(quantity) || quantity <= 0) {
      setMessage('❌ Invalid input. Please enter valid values.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setIsAdding(true);
    setMessage('');

    try {
      await axios.post('http://localhost:3001/cart', {
        customerId,
        productId: product.id,
        quantity,
      });

      setMessage(`✅ ${product.name} (x${quantity}) added to cart!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage('❌ Failed to add to cart. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-gray-100 h-48 flex items-center justify-center p-4">
        {/* Product image placeholder */}
        <svg className="h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-blue-600">₹{product.price}</span>
          <span className="text-xs text-gray-500">SKU: {product.id}</span>
        </div>

        {message && (
          <div className={`mb-3 text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-2 px-4 rounded-md font-medium flex items-center justify-center ${
            isAdding 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isAdding ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
}