'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SPEED = 150

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type Position = { x: number; y: number }

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Position>({ x: 5, y: 5 })
  const [direction, setDirection] = useState<Direction>('RIGHT')
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(INITIAL_SPEED)
  
  const directionRef = useRef(direction)
  const snakeRef = useRef(snake)
  const gameLoopRef = useRef<NodeJS.Timeout>()

  // Update snake ref when snake changes
  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  // Generate random food position
  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    }
    
    // Make sure food doesn't appear on snake by checking against current snake state
    const isOnSnake = snakeRef.current.some(segment => 
      segment.x === newFood.x && segment.y === newFood.y
    )
    
    if (isOnSnake) {
      return generateFood()
    }
    
    return newFood
  }, [])

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return
      
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current !== 'DOWN') {
            directionRef.current = 'UP'
            setDirection('UP')
          }
          break
        case 'ArrowDown':
          if (directionRef.current !== 'UP') {
            directionRef.current = 'DOWN'
            setDirection('DOWN')
          }
          break
        case 'ArrowLeft':
          if (directionRef.current !== 'RIGHT') {
            directionRef.current = 'LEFT'
            setDirection('LEFT')
          }
          break
        case 'ArrowRight':
          if (directionRef.current !== 'LEFT') {
            directionRef.current = 'RIGHT'
            setDirection('RIGHT')
          }
          break
        case ' ':
          setIsPaused(prev => !prev)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameOver])

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) {
      return;
    }

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] }

        // Move head based on direction
        switch (directionRef.current) {
          case 'UP':
            head.y -= 1
            break
          case 'DOWN':
            head.y += 1
            break
          case 'LEFT':
            head.x -= 1
            break
          case 'RIGHT':
            head.x += 1
            break
        }

        // Check for wall collisions
        if (
          head.x < 0 || 
          head.x >= GRID_SIZE || 
          head.y < 0 || 
          head.y >= GRID_SIZE
        ) {
          setGameOver(true)
          return prevSnake
        }

        // Check for collisions with self
        if (prevSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true)
          return prevSnake
        }

        const newSnake = [head, ...prevSnake]
        
        // Check if snake ate food
        if (head.x === food.x && head.y === food.y) {
          setFood(generateFood())
          setScore(prevScore => {
            const newScore = prevScore + 1;
            // Increase speed every 5 points
            if (newScore > 0 && newScore % 5 === 0) {
              setSpeed(prevSpeed => Math.max(prevSpeed - 10, 50))
            }
            return newScore;
          })
          
          return newSnake
        }

        // Remove tail if no food eaten
        newSnake.pop()
        return newSnake
      })
    }

    gameLoopRef.current = setInterval(moveSnake, speed)
    return () => clearInterval(gameLoopRef.current)
  }, [food, generateFood, gameOver, isPaused, speed])

  // Initialize food position
  useEffect(() => {
    setFood(generateFood())
  }, [generateFood])

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setDirection('RIGHT')
    directionRef.current = 'RIGHT'
    setGameOver(false)
    setScore(0)
    setSpeed(INITIAL_SPEED)
    setFood(generateFood())
    setIsPaused(false)
  }

  // Render snake segment with smooth connections
  const renderSnakeSegment = (segment: Position, index: number) => {
    const isHead = index === 0;
    
    // Determine segment type for styling
    const getSegmentClass = () => {
      if (isHead) return "bg-emerald-600 shadow-md";
      
      // Tail piece
      if (index === snake.length - 1) return "bg-green-400";
      
      // Body pieces
      return index % 2 === 0 ? "bg-green-500" : "bg-green-600";
    };

    return (
      <div
        key={`${segment.x}-${segment.y}-${index}`}
        className={`absolute rounded-md ${getSegmentClass()} flex items-center justify-center`}
        style={{
          width: CELL_SIZE - 1,
          height: CELL_SIZE - 1,
          left: segment.x * CELL_SIZE,
          top: segment.y * CELL_SIZE,
          transition: 'left 0.05s, top 0.05s',
        }}
      >
        {isHead && (
          <>
            <div className="absolute rounded-full bg-white w-2 h-2 -top-0.5 -right-0.5"></div>
            <div className="absolute rounded-full bg-white w-2 h-2 -top-0.5 -left-0.5"></div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold text-green-700">Snake Game</h1>
      
      <div className="flex justify-between w-full max-w-[625px] mb-2">
        <div className="text-lg font-semibold bg-green-100 px-4 py-2 rounded-lg shadow">
          Score: <span className="text-green-700">{score}</span>
        </div>
        <button 
          onClick={() => setIsPaused(prev => !prev)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-colors"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
      
      <div 
        className="relative bg-gray-100 border-4 border-gray-700 rounded shadow-md overflow-hidden"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 0)',
          backgroundSize: `${CELL_SIZE/2}px ${CELL_SIZE/2}px`,
        }}
      >
        {/* Wall indicators */}
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 opacity-50"></div>
        <div className="absolute top-0 left-0 h-full w-1 bg-red-500 opacity-50"></div>
        <div className="absolute top-0 right-0 h-full w-1 bg-red-500 opacity-50"></div>
        
        {/* Food with animation */}
        <div 
          className="absolute bg-red-500 rounded-full shadow-md animate-pulse"
          style={{
            width: CELL_SIZE - 4,
            height: CELL_SIZE - 4,
            left: food.x * CELL_SIZE + 2,
            top: food.y * CELL_SIZE + 2,
            background: 'radial-gradient(circle, #ff4040 40%, #ff0000 100%)',
          }}
        >
          {/* Apple stem */}
          <div className="absolute w-1 h-3 bg-green-700 -top-2 left-1/2 transform -translate-x-1/2"></div>
          {/* Apple shine */}
          <div className="absolute w-2 h-2 bg-white opacity-60 rounded-full top-1 left-1"></div>
        </div>
        
        {/* Snake */}
        {snake.map((segment, index) => renderSnakeSegment(segment, index))}
        
        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center">
            <div className="text-white text-3xl font-bold mb-4">Game Over!</div>
            <div className="text-white text-xl mb-6">Final Score: {score}</div>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-lg"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      
      {/* Controls instructions */}
      <div className="bg-gray-50 p-3 rounded-lg shadow border border-gray-200 text-center mt-2">
        <p className="text-gray-700 font-medium">Controls:</p>
        <div className="grid grid-cols-3 gap-2 w-32 mx-auto mt-2">
          <div></div>
          <button className="bg-gray-200 p-1 rounded flex justify-center items-center">↑</button>
          <div></div>
          <button className="bg-gray-200 p-1 rounded flex justify-center items-center">←</button>
          <button className="bg-gray-200 p-1 rounded flex justify-center items-center">↓</button>
          <button className="bg-gray-200 p-1 rounded flex justify-center items-center">→</button>
        </div>
        <p className="text-gray-600 text-sm mt-2">Press Space to pause/resume</p>
      </div>
    </div>
  )
}