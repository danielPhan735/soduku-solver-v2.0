import React from 'react';
import { Toaster } from 'react-hot-toast';
import SudokuGame from './components/SudokuGame';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Toaster />
      <SudokuGame />
    </div>
  );
}

export default App;