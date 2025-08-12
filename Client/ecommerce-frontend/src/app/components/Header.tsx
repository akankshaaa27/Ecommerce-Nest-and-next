'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">E-Commerce</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/product" isActive={isActive('/product')}>
              Products
            </NavLink>
            <NavLink href="/cart" isActive={isActive('/cart')}>
              Cart
            </NavLink>
            <NavLink href="/customer-list" isActive={isActive('/customer-list')}>
              Customers
            </NavLink>
            <NavLink href="/orders" isActive={isActive('/orders')}>
              Orders
            </NavLink>
          </nav>

          <div className="md:hidden">
            {/* Mobile menu button would go here */}
            <button className="text-gray-500 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, isActive, children }: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
        isActive
          ? 'border-blue-500 text-gray-900'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
      }`}
    >
      {children}
    </Link>
  );
}