import React from 'react';
import { Layout } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-600 flex-shrink-0" />
            <span className="text-lg sm:text-xl font-semibold text-gray-900 hidden sm:block">Mining Game</span>
            <span className="text-lg font-semibold text-gray-900 sm:hidden">MG</span>
          </div>
        </div>
      </div>
    </nav>
  );
}