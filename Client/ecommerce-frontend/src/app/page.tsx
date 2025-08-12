'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">E-Commerce Dashboard</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Manage your products, customers, orders, and cart from one centralized dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <DashboardCard 
          title="Products" 
          description="Manage your product inventory" 
          href="/product"
          icon="🛍️"
          bgColor="bg-blue-500"
        />
        <DashboardCard 
          title="Cart" 
          description="View and manage customer carts" 
          href="/cart"
          icon="🛒"
          bgColor="bg-green-500"
        />
        <DashboardCard 
          title="Customers" 
          description="Manage customer information" 
          href="/customer-list"
          icon="👥"
          bgColor="bg-purple-500"
        />
        <DashboardCard 
          title="Orders" 
          description="View and process orders" 
          href="/orders"
          icon="📦"
          bgColor="bg-orange-500"
        />
      </div>
    </main>
  );
}

function DashboardCard({ title, description, href, icon, bgColor }: {
  title: string;
  description: string;
  href: string;
  icon: string;
  bgColor: string;
}) {
  return (
    <Link href={href}>
      <div className={`${bgColor} hover:opacity-90 transition-all rounded-xl shadow-lg overflow-hidden text-white h-full`}>
        <div className="p-6">
          <div className="text-3xl mb-4">{icon}</div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="opacity-90">{description}</p>
        </div>
      </div>
    </Link>
  );
}