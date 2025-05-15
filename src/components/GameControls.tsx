import React from 'react';
import { RefreshCw, Lightbulb, RotateCcw, PlaySquare } from 'lucide-react';

interface GameControlsProps {
  onNumberInput: (num: number) => void;
  onClear: () => void;
  onSolve: () => void;
  onReset: () => void;
  onNewGame: () => void;
  onHint: () => void;
  isSolved: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onNumberInput,
  onClear,
  onSolve,
  onReset,
  onNewGame,
  onHint,
  isSolved
}) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="w-full md:w-auto flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => onNumberInput(num)}
            className="w-12 h-12 md:w-14 md:h-14 bg-white border border-gray-300 rounded-lg text-lg md:text-xl font-medium text-gray-800 hover:bg-gray-100 hover:border-gray-400 transition-colors"
            disabled={isSolved}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onClear}
          className="flex items-center justify-center gap-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          disabled={isSolved}
        >
          Clear
        </button>
        <button
          onClick={onHint}
          className="flex items-center justify-center gap-1 py-3 px-4 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors"
          disabled={isSolved}
        >
          <Lightbulb className="w-4 h-4" />
          Hint
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-1 py-3 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          disabled={isSolved}
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
        <button
          onClick={onNewGame}
          className="flex items-center justify-center gap-1 py-3 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <PlaySquare className="w-4 h-4" />
          New Game
        </button>
      </div>

      <button
        onClick={onSolve}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        disabled={isSolved}
      >
        <RefreshCw className="w-5 h-5" />
        Solve Puzzle
      </button>
    </div>
  );
};

export default GameControls;