'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline">
            <Image
               src="/images/haven.webp"
               alt="Handcrafted Haven Logo"
               width={40}
               height={40}
               priority
               style={{ width: 'auto', height: 'auto' }}
             />
            <span className="text-xl font-bold text-primary ml-2">
              Haven
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-gray-700 no-underline hover:text-primary transition">
              Browse
            </Link>
            <Link href="/categories" className="text-gray-700 no-underline hover:text-primary transition">
              Categories
            </Link>
            {user && user.role === 'SELLER' && (
              <Link href="/dashboard" className="text-gray-700 no-underline hover:text-primary transition">
                Dashboard
              </Link>
            )}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/cart" className="relative">
              <button className="text-gray-700 hover:text-primary transition text-2xl">
                🛒
              </button>
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            {user ? (
              <>
                <span className="text-gray-700 text-sm">{user.name}</span>
                {user.role === 'SELLER' && (
                  <Link href="/dashboard" className="text-gray-700 hover:text-primary">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                  className="bg-accent hover:bg-primary text-white px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <button className="text-primary border border-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition">
                    Login
                  </button>
                </Link>
                <Link href="/auth/register">
                  <button className="bg-primary hover:bg-accent text-white px-4 py-2 rounded transition">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none focus:text-primary"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            <Link href="/products" className="block text-gray-700 hover:text-primary">
              Browse Products
            </Link>
            <Link href="/categories" className="block text-gray-700 hover:text-primary">
              Categories
            </Link>
            {user && user.role === 'SELLER' && (
              <Link href="/dashboard" className="block text-gray-700 hover:text-primary">
                Dashboard
              </Link>
            )}
            <hr className="my-3" />
            {user ? (
              <>
                {user.role === 'SELLER' && (
                  <Link href="/dashboard" className="block text-gray-700 hover:text-primary mb-3">
                    Dashboard
                  </Link>
                )}
                <button 
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                  className="w-full text-left bg-accent hover:bg-primary text-white px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <button className="w-full text-primary border border-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition">
                    Login
                  </button>
                </Link>
                <Link href="/auth/register">
                  <button className="w-full bg-primary hover:bg-accent text-white px-4 py-2 rounded transition">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
