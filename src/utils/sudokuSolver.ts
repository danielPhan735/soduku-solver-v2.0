import init from 'glpk.js';


const glpkPromise = init();

export const solveSudoku = async (grid: number[][]): Promise<{ solution: number[][], success: boolean, message: string }> => {
  const glpk = await glpkPromise;
  try {
    const lp = {
      name: 'Sudoku',
      objective: {
        direction: glpk.GLP_MIN,
        name: 'obj',
        vars: [] 
      },
      subjectTo: [],
      binaries: []
    };

    const x: { [key: string]: string } = {};

    // Define binary variables x[i,j,v]
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        for (let v = 1; v <= 9; v++) {
          const varName = `x_${i}_${j}_${v}`;
          x[`${i},${j},${v}`] = varName;
          lp.binaries.push({ name: varName });
        }
      }
    }

    // Constraint 1: One value per cell
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        lp.subjectTo.push({
          name: `cell_${i}_${j}`,
          vars: Array.from({ length: 9 }, (_, v) => ({
            name: x[`${i},${j},${v + 1}`],
            coef: 1
          })),
          bnds: { type: glpk.GLP_FX, ub: 1, lb: 1 }
        });
      }
    }

    // Constraint 2: One of each value per row
    for (let i = 0; i < 9; i++) {
      for (let v = 1; v <= 9; v++) {
        lp.subjectTo.push({
          name: `row_${i}_${v}`,
          vars: Array.from({ length: 9 }, (_, j) => ({
            name: x[`${i},${j},${v}`],
            coef: 1
          })),
          bnds: { type: glpk.GLP_FX, ub: 1, lb: 1 }
        });
      }
    }

    // Constraint 3: One of each value per column
    for (let j = 0; j < 9; j++) {
      for (let v = 1; v <= 9; v++) {
        lp.subjectTo.push({
          name: `col_${j}_${v}`,
          vars: Array.from({ length: 9 }, (_, i) => ({
            name: x[`${i},${j},${v}`],
            coef: 1
          })),
          bnds: { type: glpk.GLP_FX, ub: 1, lb: 1 }
        });
      }
    }

    // Constraint 4: One of each value per 3x3 box
    for (let bi = 0; bi < 3; bi++) {
      for (let bj = 0; bj < 3; bj++) {
        for (let v = 1; v <= 9; v++) {
          const vars = [];
          for (let i = bi * 3; i < bi * 3 + 3; i++) {
            for (let j = bj * 3; j < bj * 3 + 3; j++) {
              vars.push({ name: x[`${i},${j},${v}`], coef: 1 });
            }
          }
          lp.subjectTo.push({
            name: `box_${bi}_${bj}_${v}`,
            vars,
            bnds: { type: glpk.GLP_FX, ub: 1, lb: 1 }
          });
        }
      }
    }

    // Constraint 5: Pre-filled cells from input
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const val = grid[i][j];
        if (val !== 0) {
          lp.subjectTo.push({
            name: `given_${i}_${j}`,
            vars: [{ name: x[`${i},${j},${val}`], coef: 1 }],
            bnds: { type: glpk.GLP_FX, ub: 1, lb: 1 }
          });
        }
      }
    }

    // Solve the problem
    const result = await glpk.solve(lp, { msgLevel: glpk.GLP_MSG_OFF });

    // Extract solution
    if (result.result.status === glpk.GLP_OPT) {
      const solution = Array.from({ length: 9 }, () => Array(9).fill(0));

      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          let assigned = false;
          for (let v = 1; v <= 9; v++) {
            const val = result.result.vars[x[`${i},${j},${v}`]];
            if (val >= 0.99) { // Tighter threshold for binary variable
              solution[i][j] = v;
              assigned = true;
              break;
            }
          }
          if (!assigned) {
            return { solution: grid, success: false, message: `No value assigned to cell (${i},${j}).` };
          }
        }
      }

      // Validate that all cells are filled
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (solution[i][j] === 0) {
            return { solution: grid, success: false, message: `Cell (${i},${j}) is unassigned.` };
          }
        }
      }

      return { solution, success: true, message: "Solved successfully." };
    } else {
      return { solution: grid, success: false, message: "No solution found." };
    }

  } catch (err) {
    console.error("Error in Sudoku Solver:", err);
    return { solution: grid, success: false, message: "An error occurred during solving." };
  }
};