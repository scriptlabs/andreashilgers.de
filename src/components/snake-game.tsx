"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { RiCloseLine, RiRefreshLine, RiPlayLine } from "react-icons/ri";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 150;

export function SnakeGame({ onClose }: { onClose: () => void }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
    generateFood();
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check if food eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, gameStarted, generateFood]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameLoopRef.current = setInterval(moveSnake, SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameStarted, gameOver, moveSnake]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case "Escape":
          onClose();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-mono">
      <div className="relative w-full max-w-lg aspect-square border-4 border-[var(--primary)] bg-black p-1 shadow-[0_0_20px_var(--primary)]">
        
        {/* Header */}
        <div className="absolute -top-12 left-0 right-0 flex justify-between items-center text-[var(--primary)] px-2">
          <div className="text-xl font-bold">SCORE: {score.toString().padStart(4, "0")}</div>
          <button onClick={onClose} className="hover:text-white transition-colors">
            <RiCloseLine size={32} />
          </button>
        </div>

        {/* Game Grid */}
        <div 
          className="w-full h-full relative grid" 
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnake = snake.some(s => s.x === x && s.y === y);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isFood = food.x === x && food.y === y;

            return (
              <div 
                key={i} 
                className={`w-full h-full border-[0.5px] border-white/5 flex items-center justify-center`}
              >
                {isSnake && (
                  <div className={`w-[90%] h-[90%] ${isHead ? "bg-[var(--primary)]" : "bg-[var(--primary)]/60"}`} />
                )}
                {isFood && (
                  <div className="w-[80%] h-[80%] bg-[var(--secondary)] animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        {/* Overlays */}
        {!gameStarted && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-4xl font-black text-[var(--primary)] mb-8 animate-pulse">SNAKE.EXE</h2>
            <button 
              onClick={resetGame}
              className="btn-primary px-8 py-4 flex items-center gap-3 text-xl"
            >
              <RiPlayLine size={24} /> START GAME
            </button>
            <p className="mt-8 text-xs text-[var(--secondary)]">USE ARROW KEYS TO NAVIGATE</p>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-4xl font-black text-red-500 mb-2">GAME OVER</h2>
            <p className="text-[var(--primary)] mb-8 text-xl tracking-widest">FINAL SCORE: {score}</p>
            <div className="flex gap-4">
              <button 
                onClick={resetGame}
                className="btn-primary px-6 py-3 flex items-center gap-2"
              >
                <RiRefreshLine size={20} /> TRY AGAIN
              </button>
              <button 
                onClick={onClose}
                className="btn-outline px-6 py-3"
              >
                EXIT
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Retro background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,var(--primary)_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>
    </div>
  );
}
