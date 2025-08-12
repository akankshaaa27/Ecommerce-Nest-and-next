import axios from 'axios';

export const product_api = axios.create({
  baseURL: 'http://localhost:3001', // replace with your backend gateway
});

export const customer_api = axios.create({
  baseURL: 'http://localhost:3002', // replace with your backend gateway
});

