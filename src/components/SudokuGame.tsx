import React, { useState } from 'react';
import SudokuBoard from './SudokuBoard';
import { toast } from 'react-hot-toast';
import { solveSudoku } from '../utils/sudokuSolver';
import { RefreshCw } from 'lucide-react';

const SudokuGame = () => {
  const [board, setBoard] = useState<number[][]>(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(0))
  );
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );
  const [solving, setSolving] = useState(false);

  const checkConflicts = (
    row: number,
    col: number,
    value: number
  ): string | null => {
    // Check row
    for (let c = 0; c < 9; c++) {
      if (c !== col && board[row][c] === value) {
        return 'row';
      }
    }

    // Check column
    for (let r = 0; r < 9; r++) {
      if (r !== row && board[r][col] === value) {
        return 'column';
      }
    }

    // Check 3x3 box
    const boxStartRow = Math.floor(row / 3) * 3;
    const boxStartCol = Math.floor(col / 3) * 3;
    for (let r = boxStartRow; r < boxStartRow + 3; r++) {
      for (let c = boxStartCol; c < boxStartCol + 3; c++) {
        if ((r !== row || c !== col) && board[r][c] === value) {
          return 'box';
        }
      }
    }

    return null;
  };

  const handleCellChange = (row: number, col: number, value: string) => {
    const numValue = value === '' ? 0 : parseInt(value);
    if ((numValue >= 0 && numValue <= 9) || value === '') {
      if (numValue !== 0) {
        const conflict = checkConflicts(row, col, numValue);
        if (conflict) {
          const messages = {
            row: 'This number already exists in the same row!',
            column: 'This number already exists in the same column!',
            box: 'This number already exists in the 3x3 box!',
          };
          toast.error(messages[conflict], {
            duration: 2000,
            position: 'top-center',
          });
          return;
        }
      }

      const newBoard = board.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? numValue : c))
      );
      setBoard(newBoard);
    }
  };

  const handleSolve = async () => {
    const filledCells = board.flat().filter((cell) => cell !== 0).length;
    if (filledCells < 17) {
      toast.error('At least 17 cells must be filled to solve the puzzle!', {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }

    setSolving(true);
    try {
      const result = await solveSudoku(board);
      if (result.success) {
        setBoard(result.solution);
        toast.success('Puzzle solved successfully!');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Error solving the puzzle');
    } finally {
      setSolving(false);
    }
  };

  const handleClear = () => {
    setBoard(
      Array(9)
        .fill(null)
        .map(() => Array(9).fill(0))
    );
    setSelectedCell(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!selectedCell) return;

    const [currentRow, currentCol] = selectedCell;
    let newRow = currentRow;
    let newCol = currentCol;

    switch (e.key) {
      case 'ArrowUp':
        newRow = Math.max(0, currentRow - 1);
        break;
      case 'ArrowDown':
        newRow = Math.min(8, currentRow + 1);
        break;
      case 'ArrowLeft':
        newCol = Math.max(0, currentCol - 1);
        break;
      case 'ArrowRight':
        newCol = Math.min(8, currentCol + 1);
        break;
      default:
        return;
    }

    setSelectedCell([newRow, newCol]);
    e.preventDefault();
  };

  return (
    <div
      className="bg-white p-8 rounded-xl shadow-lg"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Sudoku Solver
      </h1>
      <SudokuBoard
        board={board}
        onCellChange={handleCellChange}
        selectedCell={selectedCell}
        onCellSelect={setSelectedCell}
      />
      <div className="mt-6 flex gap-4 justify-center">
        <button
          onClick={handleSolve}
          disabled={solving}
          className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 ${
            solving ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {solving && <RefreshCw className="w-4 h-4 animate-spin" />}
          {solving ? 'Solving...' : 'Solve'}
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SudokuGame;
