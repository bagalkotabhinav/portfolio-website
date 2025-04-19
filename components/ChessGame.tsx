'use client';

import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

export default function ChessGame() {
  const [game, setGame] = useState(new Chess());
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  // Bot makes a random move
  const makeBotMove = () => {
    const possibleMoves = game.moves();
    if (possibleMoves.length === 0 || game.isGameOver()) return;

    // Random move selection
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    const move = possibleMoves[randomIndex];
    
    // Delay the bot move to make it feel more natural
    setTimeout(() => {
      game.move(move);
      setGame(new Chess(game.fen()));
      setIsPlayerTurn(true);
    }, 500);
  };

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    if (!isPlayerTurn) return false; // Ignore moves when it's not player's turn

    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // always promote to queen for simplicity
      });

      if (move === null) return false;

      setGame(new Chess(game.fen()));
      setIsPlayerTurn(false); // Switch to bot's turn
      return true;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    if (!isPlayerTurn && game.turn() === 'b') {
      makeBotMove();
    }
  }, [isPlayerTurn, game]);

  const resetBoard = () => {
    setGame(new Chess());
    setIsPlayerTurn(true);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full max-w-[680px] aspect-square mx-auto"> {/* Changed to fill parent */}
  <Chessboard 
    position={game.fen()} 
    onPieceDrop={onDrop} 
    boardOrientation="white"
    customBoardStyle={{
      borderRadius: '4px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
    }}
    customDarkSquareStyle={{ backgroundColor: '#779556' }}
    customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
  />
</div>
      <button
        onClick={resetBoard}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Reset Game
      </button>
      {!isPlayerTurn && (
        <div className="text-gray-600">Bot is thinking...</div>
      )}
    </div>
  );
}