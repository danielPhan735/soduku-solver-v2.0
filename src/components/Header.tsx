import React from 'react';
import { Grid3X3 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Grid3X3 className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Sudoku Master</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;