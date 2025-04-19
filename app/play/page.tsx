'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ChessGame from '@/components/ChessGame'
import SnakeGame from '@/components/SnakeGame'
import SudokuGame from '@/components/SudokuGame'
import { Button } from '@/components/ui/button'

export default function PlayPage() {
  const [gameSelected, setGameSelected] = useState<'none' | 'chess' | 'snake' | 'sudoku'>('none')
  const router = useRouter()

  const handleBackToHome = () => {
    router.push('/') // Navigate back to homepage or wherever you want
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {gameSelected === 'none' ? (
        <>
          <div className="w-full max-w-4xl mb-6">
            <Button 
              onClick={handleBackToHome}
              variant="ghost"
              className="text-gray-600"
            >
              ← Back to home
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold mb-6">Choose a Game</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button 
              onClick={() => setGameSelected('chess')}
              className="w-40 h-40 flex flex-col items-center justify-center gap-2"
              variant="outline"
            >
              <span className="text-4xl">♔</span>
              <span className="text-lg">Chess</span>
            </Button>
            <Button 
              onClick={() => setGameSelected('snake')}
              className="w-40 h-40 flex flex-col items-center justify-center gap-2"
              variant="outline"
            >
              <span className="text-4xl">🐍</span>
              <span className="text-lg">Snake</span>
            </Button>
            <Button 
              onClick={() => setGameSelected('sudoku')}
              className="w-40 h-40 flex flex-col items-center justify-center gap-2"
              variant="outline"
            >
              <span className="text-4xl">9x9</span>
              <span className="text-lg">Sudoku</span>
            </Button>
          </div>
        </>
      ) : (
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <Button 
              onClick={() => setGameSelected('none')}
              variant="ghost"
              className="text-gray-600"
            >
              ← Back to menu
            </Button>
            <h1 className="text-2xl font-semibold text-center">
              {gameSelected === 'chess' ? 'Chess - Good luck! ♟️' : 
               gameSelected === 'snake' ? 'Snake Game 🐍' : 'Sudoku 9×9'}
            </h1>
            <div className="w-24"></div> {/* Spacer for balance */}
          </div>
          
          <div className="w-full aspect-square max-h-[80vh]">
            {gameSelected === 'chess' ? <ChessGame /> : 
             gameSelected === 'snake' ? <SnakeGame /> : <SudokuGame />}
          </div>
        </div>
      )}
    </div>
  )
}