import React from 'react';

interface SudokuBoardProps {
  board: number[][];
  onCellChange: (row: number, col: number, value: string) => void;
  selectedCell: [number, number] | null;
  onCellSelect: (cell: [number, number]) => void;
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({ 
  board, 
  onCellChange, 
  selectedCell, 
  onCellSelect 
}) => {
  return (
    <div className="grid grid-cols-9 gap-[1px] border-2 border-gray-800 bg-gray-800">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
          
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                w-12 h-12 bg-white flex items-center justify-center
                ${colIndex % 3 === 0 && colIndex !== 0 ? 'border-l-2 border-l-gray-800' : ''}
                ${rowIndex % 3 === 0 && rowIndex !== 0 ? 'border-t-2 border-t-gray-800' : ''}
                ${isSelected ? 'bg-blue-100' : ''}
              `}
              onClick={() => onCellSelect([rowIndex, colIndex])}
            >
              <input
                type="text"
                value={cell === 0 ? '' : cell}
                onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
                className={`w-full h-full text-center text-xl focus:outline-none hover:bg-blue-50 ${cell === 0 ? 'text-red-600' : 'text-gray-800'}`}
                maxLength={1}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default SudokuBoard