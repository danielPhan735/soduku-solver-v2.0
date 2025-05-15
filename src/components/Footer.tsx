
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Sudoku Master. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-500 hover:text-blue-600 text-sm">Terms</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 text-sm">Privacy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 text-sm">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;