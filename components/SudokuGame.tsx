'use client'

import { useState, useEffect, useCallback } from 'react'

export default function SudokuGame() {
  // Game states
  const [board, setBoard] = useState<number[][]>(Array(9).fill(null).map(() => Array(9).fill(0)))
  const [solution, setSolution] = useState<number[][]>(Array(9).fill(null).map(() => Array(9).fill(0)))
  const [initialBoard, setInitialBoard] = useState<boolean[][]>(Array(9).fill(null).map(() => Array(9).fill(false)))
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [gameWon, setGameWon] = useState(false)
  const [mistakes, setMistakes] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [notes, setNotes] = useState<number[][][]>(
    Array(9).fill(null).map(() => Array(9).fill(null).map(() => []))
  )
  const [isNotesMode, setIsNotesMode] = useState(false)
  const [hints, setHints] = useState(3)
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isPlaying && !gameWon) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, gameWon]);
  
  // Format time for display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Check if board is valid
  const isValidMove = (row: number, col: number, num: number, currentBoard: number[][]) => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (currentBoard[row][x] === num) return false;
    }
    
    // Check column
    for (let x = 0; x < 9; x++) {
      if (currentBoard[x][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (currentBoard[boxRow + i][boxCol + j] === num) return false;
      }
    }
    
    return true;
  };
  
  // Generate a solved Sudoku board
  const generateSolution = () => {
    const board = Array(9).fill(null).map(() => Array(9).fill(0));
    
    const solve = () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            // Shuffle array of numbers 1-9
            const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
            
            for (let i = 0; i < nums.length; i++) {
              const num = nums[i];
              
              if (isValidMove(row, col, num, board)) {
                board[row][col] = num;
                
                if (solve()) {
                  return true;
                }
                
                board[row][col] = 0;
              }
            }
            
            return false;
          }
        }
      }
      
      return true;
    };
    
    solve();
    return board;
  };
  
  // Create a new game with the specified difficulty
  const newGame = (selectedDifficulty: 'easy' | 'medium' | 'hard') => {
    // Generate a complete solution
    const newSolution = generateSolution();
    setSolution(newSolution);
    
    // Create a copy for the player's board
    const playerBoard = newSolution.map(row => [...row]);
    const newInitialBoard = Array(9).fill(null).map(() => Array(9).fill(true));
    
    // Determine how many cells to remove based on difficulty
    let cellsToRemove: number;
    switch (selectedDifficulty) {
      case 'easy':
        cellsToRemove = 40; // 41 clues (81-40)
        break;
      case 'medium':
        cellsToRemove = 50; // 31 clues (81-50)
        break;
      case 'hard':
        cellsToRemove = 60; // 21 clues (81-60)
        break;
      default:
        cellsToRemove = 50;
    }
    
    // Randomly remove cells
    let removed = 0;
    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      
      if (playerBoard[row][col] !== 0) {
        playerBoard[row][col] = 0;
        newInitialBoard[row][col] = false;
        removed++;
      }
    }
    
    // Reset game state
    setBoard(playerBoard);
    setInitialBoard(newInitialBoard);
    setSelectedCell(null);
    setGameWon(false);
    setMistakes(0);
    setTimeElapsed(0);
    setIsPlaying(true);
    setNotes(Array(9).fill(null).map(() => Array(9).fill(null).map(() => [])));
    setHints(3);
    setDifficulty(selectedDifficulty);
  };
  
  // Check if the board is correctly solved
  const checkBoard = useCallback(() => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== solution[row][col]) {
          return false;
        }
      }
    }
    return true;
  }, [board, solution]);
  
  // Check if the game is won after each move
  useEffect(() => {
    if (isPlaying && checkBoard()) {
      setGameWon(true);
      setIsPlaying(false);
    }
  }, [board, checkBoard, isPlaying]);
  
  // Handle cell selection
  const handleCellClick = (row: number, col: number) => {
    if (!gameWon && isPlaying) {
      setSelectedCell([row, col]);
    }
  };
  
  // Handle digit input
  const handleDigitClick = (digit: number) => {
    if (!selectedCell || gameWon || !isPlaying) return;
    
    const [row, col] = selectedCell;
    
    // Don't modify initially provided cells
    if (initialBoard[row][col]) return;
    
    // Handle notes mode
    if (isNotesMode) {
      setNotes(prevNotes => {
        const newNotes = [...prevNotes.map(r => [...r.map(c => [...c])])];
        const currentNotes = newNotes[row][col];
        
        // Toggle the note
        if (currentNotes.includes(digit)) {
          newNotes[row][col] = currentNotes.filter(n => n !== digit);
        } else {
          newNotes[row][col] = [...currentNotes, digit].sort();
        }
        
        return newNotes;
      });
      return;
    }
  
    // Normal digit entry mode
    if (board[row][col] === digit) {
      // If clicking the same number, clear the cell
      const newBoard = [...board.map(r => [...r])];
      newBoard[row][col] = 0;
      setBoard(newBoard);
    } else {
      // Check if move is correct
      const isCorrect = solution[row][col] === digit;
      
      if (!isCorrect) {
        setMistakes(prev => prev + 1);
      }
      
      // Update the board regardless
      const newBoard = [...board.map(r => [...r])];
      newBoard[row][col] = digit;
      setBoard(newBoard);
      
      // Clear notes for this cell
      setNotes(prevNotes => {
        const newNotes = [...prevNotes.map(r => [...r.map(c => [...c])])];
        newNotes[row][col] = [];
        return newNotes;
      });
    }
  };
  
  // Clear selected cell
  const handleClearClick = () => {
    if (!selectedCell || gameWon || !isPlaying) return;
    
    const [row, col] = selectedCell;
    
    // Don't modify initially provided cells
    if (initialBoard[row][col]) return;
    
    const newBoard = [...board.map(r => [...r])];
    newBoard[row][col] = 0;
    setBoard(newBoard);
    
    // Also clear notes for this cell
    setNotes(prevNotes => {
      const newNotes = [...prevNotes.map(r => [...r.map(c => [...c])])];
      newNotes[row][col] = [];
      return newNotes;
    });
  };
  
  // Use a hint
  const handleHintClick = () => {
    if (!selectedCell || gameWon || !isPlaying || hints <= 0) return;
    
    const [row, col] = selectedCell;
    
    // Don't provide hints for initially provided cells or already correct cells
    if (initialBoard[row][col] || board[row][col] === solution[row][col]) return;
    
    // Update the board with the correct value
    const newBoard = [...board.map(r => [...r])];
    newBoard[row][col] = solution[row][col];
    setBoard(newBoard);
    
    // Clear notes for this cell
    setNotes(prevNotes => {
      const newNotes = [...prevNotes.map(r => [...r.map(c => [...c])])];
      newNotes[row][col] = [];
      return newNotes;
    });
    
    // Decrement hints
    setHints(prev => prev - 1);
  };

  // Initialize game on first render
  useEffect(() => {
    newGame('medium');
  }, []);
  
  // Check if a cell has conflicts
  const hasConflict = (row: number, col: number) => {
    if (board[row][col] === 0) return false;
    
    const value = board[row][col];
    
    // Check row
    for (let i = 0; i < 9; i++) {
      if (i !== col && board[row][i] === value) {
        return true;
      }
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
      if (i !== row && board[i][col] === value) {
        return true;
      }
    }
    
    // Check 3x3 box
    const boxRowStart = Math.floor(row / 3) * 3;
    const boxColStart = Math.floor(col / 3) * 3;
    
    for (let i = boxRowStart; i < boxRowStart + 3; i++) {
      for (let j = boxColStart; j < boxColStart + 3; j++) {
        if (i !== row && j !== col && board[i][j] === value) {
          return true;
        }
      }
    }
    
    return false;
  };
  
  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">Sudoku</h1>
      
      {/* Game info */}
      <div className="flex justify-between w-full mb-4 text-sm">
        <div className="bg-blue-100 p-2 rounded-lg shadow flex items-center">
          <span className="font-medium">Time:</span> 
          <span className="ml-1 font-mono">{formatTime(timeElapsed)}</span>
        </div>
        
        <div className="bg-blue-100 p-2 rounded-lg shadow flex items-center">
          <span className="font-medium">Difficulty:</span> 
          <span className="ml-1 capitalize">{difficulty}</span>
        </div>
        
        <div className="bg-blue-100 p-2 rounded-lg shadow flex items-center">
          <span className="font-medium">Mistakes:</span> 
          <span className={`ml-1 ${mistakes > 0 ? 'text-red-600' : ''}`}>{mistakes}/3</span>
        </div>
      </div>
      
      {/* Sudoku board */}
      <div className="grid grid-cols-9 gap-0 border-2 border-gray-800 bg-white shadow-lg mb-4">
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => {
            // Calculate borders for 3x3 boxes
            const rightBorder = (colIndex + 1) % 3 === 0 && colIndex < 8;
            const bottomBorder = (rowIndex + 1) % 3 === 0 && rowIndex < 8;
            
            // Determine cell styling
            const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
            const isInitial = initialBoard[rowIndex][colIndex];
            const cellHasConflict = hasConflict(rowIndex, colIndex);
            const sameValueAsSelected = selectedCell && board[selectedCell[0]][selectedCell[1]] !== 0 && 
                                        board[selectedCell[0]][selectedCell[1]] === cell && cell !== 0;
            
            return (
              <div 
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center relative
                  ${rightBorder ? 'border-r-2 border-gray-800' : 'border-r border-gray-300'}
                  ${bottomBorder ? 'border-b-2 border-gray-800' : 'border-b border-gray-300'}
                  ${isSelected ? 'bg-blue-200' : sameValueAsSelected ? 'bg-blue-100' : ''}
                  ${cellHasConflict ? 'text-red-600' : ''}
                  ${isInitial ? 'font-bold' : 'font-normal'}
                  cursor-pointer transition-colors
                `}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell !== 0 ? (
                  <span>{cell}</span>
                ) : (
                  notes[rowIndex][colIndex].length > 0 && (
                    <div className="grid grid-cols-3 gap-0 text-xs text-gray-500 w-full h-full p-px">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                        <div key={n} className="flex items-center justify-center">
                          {notes[rowIndex][colIndex].includes(n) ? n : ''}
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            );
          })
        ))}
      </div>
      
      {/* Game controls */}
      <div className="w-full">
        {/* Number pad */}
        <div className="grid grid-cols-9 gap-1 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
            <button
              key={n}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 text-white rounded flex items-center justify-center font-medium hover:bg-blue-600 transition-colors"
              onClick={() => handleDigitClick(n)}
            >
              {n}
            </button>
          ))}
        </div>
        
        {/* Game actions */}
        <div className="flex justify-between gap-2 mb-4">
          <button
            className={`
              px-3 py-2 rounded font-medium flex-1
              ${isNotesMode ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}
              hover:opacity-90 transition-colors text-sm
            `}
            onClick={() => setIsNotesMode(!isNotesMode)}
          >
            Notes {isNotesMode ? '(On)' : '(Off)'}
          </button>
          
          <button
            className="px-3 py-2 bg-yellow-500 text-white rounded font-medium flex-1 hover:bg-yellow-600 transition-colors text-sm disabled:opacity-50"
            onClick={handleHintClick}
            disabled={hints <= 0}
          >
            Hint ({hints})
          </button>
          
          <button
            className="px-3 py-2 bg-red-500 text-white rounded font-medium flex-1 hover:bg-red-600 transition-colors text-sm"
            onClick={handleClearClick}
          >
            Clear
          </button>
        </div>
        
        {/* New game buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            className="px-2 py-2 bg-blue-500 text-white rounded text-xs sm:text-sm font-medium hover:bg-blue-600 transition-colors"
            onClick={() => newGame('easy')}
          >
            New Easy
          </button>
          
          <button
            className="px-2 py-2 bg-blue-600 text-white rounded text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors"
            onClick={() => newGame('medium')}
          >
            New Medium
          </button>
          
          <button
            className="px-2 py-2 bg-blue-700 text-white rounded text-xs sm:text-sm font-medium hover:bg-blue-800 transition-colors"
            onClick={() => newGame('hard')}
          >
            New Hard
          </button>
        </div>
      </div>
      
      {/* Game over overlay */}
      {gameWon && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Puzzle Solved!</h2>
            
            <p className="mb-3">
              You completed the {difficulty} puzzle in {formatTime(timeElapsed)} with {mistakes} mistakes.
            </p>
            
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition-colors"
                onClick={() => newGame(difficulty)}
              >
                New Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}