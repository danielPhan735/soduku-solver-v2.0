import { solveSudoku } from './sudokuSolver';

// Kiểm tra ô (row, col) có xung đột trên board không
const hasConflict = (board: number[][], row: number, col: number): boolean => {
  const value = board[row][col];
  if (value === 0) return false; // ô trống không xung đột

  // Kiểm tra cùng hàng
  for (let c = 0; c < 9; c++) {
    if (c !== col && board[row][c] === value) {
      return true;
    }
  }

  // Kiểm tra cùng cột
  for (let r = 0; r < 9; r++) {
    if (r !== row && board[r][col] === value) {
      return true;
    }
  }

  // Kiểm tra hộp 3x3
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c] === value) {
        return true;
      }
    }
  }

  return false;
};

// Kiểm tra toàn bộ board, trả về danh sách vị trí các ô lỗi (có xung đột)
export const checkBoardValidity = (board: number[][]): [number, number][] => {
  const errorCells: [number, number][] = [];

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] !== 0 && hasConflict(board, row, col)) {
        errorCells.push([row, col]);
      }
    }
  }

  return errorCells;
};

// Kiểm tra board đã điền hết chưa (có ô 0 hay không)
export const isBoardComplete = (board: number[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return false;
      }
    }
  }
  return true;
};

// Kiểm tra board có hợp lệ (không xung đột cơ bản và có lời giải)
export const isValidBoard = async (board: number[][]): Promise<boolean> => {
  // Kiểm tra xung đột cơ bản
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] !== 0 && hasConflict(board, row, col)) {
        return false;
      }
    }
  }

  // Gọi solver GLPK để kiểm tra có lời giải không
  const result = await solveSudoku(board);
  return result.success;
};
