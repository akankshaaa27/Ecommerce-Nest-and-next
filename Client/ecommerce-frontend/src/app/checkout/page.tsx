'use client'
import {product_api, customer_api} from '@/app/api';
import Headers from '@/app/components/Header';
export default function CheckoutPage() {
  const handleCheckout = () => {
    product_api.post('/order', {
      customerName: 'Dhiraj', // Replace with actual customer
      items: [] // send cart items
    }).then(() => alert('Order placed!'));
  };

  return (
    <div>
      <Headers/>
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
}
