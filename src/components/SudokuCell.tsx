import React from 'react';

interface SudokuCellProps {
  value: number;
  isOriginal: boolean;
  isSelected: boolean;
  isSameBox: boolean;
  isSameRowOrCol: boolean;
  isSameNumber: boolean;
  isError: boolean;
  onClick: () => void;
  row: number;
  col: number;
}

const SudokuCell: React.FC<SudokuCellProps> = ({
  value,
  isOriginal,
  isSelected,
  isSameBox,
  isSameRowOrCol,
  isSameNumber,
  isError,
  onClick,
  row,
  col
}) => {
  const getBgColor = () => {
    if (isSelected) return 'bg-blue-200';
    if (isError) return 'bg-red-100';
    if (isSameNumber) return 'bg-blue-50';
    if (isSameBox) return 'bg-gray-100';
    if (isSameRowOrCol) return 'bg-gray-50';
    return 'bg-white';
  };

  const getBorderStyle = () => {
    let borderClasses = '';
    
    // Thick borders between 3x3 boxes
    if (col % 3 === 0 && col !== 0) borderClasses += ' border-l-2 border-l-gray-800';
    if (row % 3 === 0 && row !== 0) borderClasses += ' border-t-2 border-t-gray-800';
    
    return borderClasses;
  };

  return (
    <div
      className={`
        w-full aspect-square flex items-center justify-center
        cursor-pointer transition-all duration-150 select-none
        ${getBgColor()} ${getBorderStyle()}
        hover:bg-blue-100 active:bg-blue-200
      `}
      onClick={onClick}
    >
      {value > 0 && (
        <span 
          className={`
            text-xl sm:text-2xl font-medium
            ${isOriginal ? 'text-gray-800' : 'text-red-600'}
            ${isError ? 'text-red-500' : ''}
          `}
        >
          {value}
        </span>
      )}
    </div>
  );
};