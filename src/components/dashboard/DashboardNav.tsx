'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

export default function DashboardNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/dashboard" className="font-bold text-xl">
            Seller Dashboard
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <Link href="/dashboard" className="hover:text-accent transition">
              Overview
            </Link>
            <Link href="/dashboard/products" className="hover:text-accent transition">
              Products
            </Link>
            <Link href="/dashboard/orders" className="hover:text-accent transition">
              Orders
            </Link>
            <Link href="/dashboard/profile" className="hover:text-accent transition">
              Profile
            </Link>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-accent hover:bg-opacity-90 px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/dashboard"
              className="block hover:text-accent transition py-2"
              onClick={() => setMenuOpen(false)}
            >
              Overview
            </Link>
            <Link
              href="/dashboard/products"
              className="block hover:text-accent transition py-2"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/dashboard/orders"
              className="block hover:text-accent transition py-2"
              onClick={() => setMenuOpen(false)}
            >
              Orders
            </Link>
            <Link
              href="/dashboard/profile"
              className="block hover:text-accent transition py-2"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full text-left hover:text-accent transition py-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
