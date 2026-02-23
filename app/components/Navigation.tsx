'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getMenuStructure } from '../data/mockData';
import { MenuItem } from '../types';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const menuStructure = getMenuStructure();

  const toggleDropdown = (menuId: string) => {
    setOpenDropdowns(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const renderMenuItem = (item: MenuItem, isChild = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isDropdownOpen = openDropdowns.includes(item.id);
    const href = item.slug === '' ? '/' : `/${item.slug}`;

    return (
      <div key={item.id} className={`relative ${isChild ? 'ml-4' : ''}`}>
        <div className="flex items-center">
          <Link
            href={href}
            className={`
              block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors
              ${isChild ? 'text-sm' : 'font-medium'}
            `}
          >
            {item.title}
          </Link>
          {hasChildren && (
            <button
              onClick={() => toggleDropdown(item.id)}
              className="ml-2 p-1 text-gray-500 hover:text-gray-700"
              aria-label={`Toggle ${item.title} submenu`}
            >
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
        
        {hasChildren && isDropdownOpen && (
          <div className="mt-2 space-y-1">
            {item.children!.map(child => (
              <Link
                key={child.id}
                href={`/${item.slug}/${child.slug}`}
                className="block px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                {child.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-600">News Portal</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {Object.values(menuStructure).map(item => (
              <div key={item.id} className="relative group">
                <Link
                  href={item.slug === '' ? '/' : `/${item.slug}`}
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {item.title}
                </Link>
                
                {/* Desktop Dropdown */}
                {item.children && item.children.length > 0 && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {item.children.map(child => (
                        <Link
                          key={child.id}
                          href={`/${item.slug}/${child.slug}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {Object.values(menuStructure).map(item => renderMenuItem(item))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
