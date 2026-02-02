'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Image
                  src="/images/haven.webp"
                  alt="Handcrafted Haven Logo"
                  width={40}
                  height={40}
                  style={{ width: 'auto', height: 'auto' }}
                />
              <h3 className="text-xl font-bold ml-2">Haven</h3>
            </div>
            <p className="text-secondary">
              Discover unique handcrafted items from talented artisans worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-secondary">
              <li>
                <Link href="/products" className="hover:text-white transition">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Sellers */}
          <div>
            <h4 className="font-semibold mb-4">For Sellers</h4>
            <ul className="space-y-2 text-secondary">
              <li>
                <Link href="/become-seller" className="hover:text-white transition">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link href="/seller-guide" className="hover:text-white transition">
                  Seller Guide
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-white transition">
                  Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-secondary">
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-secondary py-8">
          {/* Newsletter */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded text-gray-800"
                aria-label="Email for newsletter"
                suppressHydrationWarning
              />
              <button
                className="bg-accent hover:bg-secondary text-white px-6 py-2 rounded transition"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Social & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center text-secondary text-sm">
            <p>&copy; {currentYear} Handcrafted Haven. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition" aria-label="Facebook">
                Facebook
              </a>
              <a href="#" className="hover:text-white transition" aria-label="Instagram">
                Instagram
              </a>
              <a href="#" className="hover:text-white transition" aria-label="Twitter">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition" aria-label="Pinterest">
                Pinterest
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
