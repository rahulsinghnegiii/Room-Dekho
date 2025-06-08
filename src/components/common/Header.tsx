'use client';

import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-accent flex items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#FF5A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 7L17 4.5L22 7" stroke="#FF5A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 7L7 4.5L2 7" stroke="#FF5A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 7L12 12L22 7" stroke="#FF5A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12V22" stroke="#FF5A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Room Dekho
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-accent font-medium">
              Home
            </Link>
            <Link href="/listings" className="text-gray-600 hover:text-accent font-medium">
              Listings
            </Link>
            <Link
              href="/submit-listing"
              className="text-gray-600 hover:text-accent font-medium"
            >
              Submit Listing
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-accent font-medium">
              Contact
            </Link>
            <div className="flex items-center space-x-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
                <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10C16 11.1046 15.1046 12 14 12C12.8954 12 12 11.1046 12 10C12 8.89543 12.8954 8 14 8C15.1046 8 16 8.89543 16 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <Link href="/listings" className="bg-accent text-white px-5 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200">
                Book now
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-600 hover:text-accent font-medium"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/listings"
              className="block text-gray-600 hover:text-accent font-medium"
              onClick={toggleMenu}
            >
              Listings
            </Link>
            <Link
              href="/submit-listing"
              className="block text-gray-600 hover:text-accent font-medium"
              onClick={toggleMenu}
            >
              Submit Listing
            </Link>
            <Link
              href="/contact"
              className="block text-gray-600 hover:text-accent font-medium"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link href="/listings" className="w-full bg-accent text-white px-5 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 mt-4">
              Book now
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 