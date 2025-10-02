import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { BIBLE_BOOKS } from '../constants';
import type { BibleBook } from '../types';

interface BookOrderGameProps {
  category: string;
  testament?: 'Old' | 'New';
  onBack: () => void;
}

const BookOrderGame: React.FC<BookOrderGameProps> = ({ category, testament, onBack }) => {
  const [correctOrder, setCorrectOrder] = useState<BibleBook[]>([]);
  const [shuffledBooks, setShuffledBooks] = useState<BibleBook[]>([]);
  const [userOrder, setUserOrder] = useState<BibleBook[]>([]);
  const [draggedBook, setDraggedBook] = useState<BibleBook | null>(null);
  const [gameState, setGameState] = useState<'playing' | 'correct' | 'incorrect'>('playing');

  const shuffleArray = useCallback(<T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  }, []);

  const setupGame = useCallback(() => {
    const booksInCategory = BIBLE_BOOKS.filter(book => 
        book.category === category && 
        (!testament || book.testament === testament)
    );
    setCorrectOrder(booksInCategory);
    setShuffledBooks(shuffleArray(booksInCategory));
    setUserOrder([]);
    setGameState('playing');
  }, [category, testament, shuffleArray]);

  useEffect(() => {
    setupGame();
  }, [setupGame]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, book: BibleBook) => {
    setDraggedBook(book);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleDropOnTarget = () => {
    if (draggedBook) {
      setUserOrder(prev => [...prev, draggedBook]);
      setShuffledBooks(prev => prev.filter(b => b.name !== draggedBook.name));
      setDraggedBook(null);
    }
  };
  
  const handleBookReturn = (book: BibleBook) => {
     setShuffledBooks(prev => [...prev, book]);
     setUserOrder(prev => prev.filter(b => b.name !== book.name));
  }

  const checkAnswer = () => {
    if (userOrder.length !== correctOrder.length) {
      setGameState('incorrect');
      return;
    }
    const isCorrect = userOrder.every((book, index) => book.name === correctOrder[index].name);
    setGameState(isCorrect ? 'correct' : 'incorrect');
  };
  
  const GameFeedback = useMemo(() => {
    if (gameState === 'correct') {
      return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-green-100 text-green-800 text-center font-bold">
          <p>Excellent! You've mastered the order for {category}!</p>
        </div>
      );
    }
    if (gameState === 'incorrect') {
       return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-red-100 text-red-800 text-center font-bold">
          <p>Not Quite. Give it another try!</p>
        </div>
      );
    }
    return null;
  }, [gameState, category]);

  return (
    <div className="p-4 flex flex-col h-full">
        <button onClick={onBack} className="absolute top-4 left-4 text-slate-500 hover:text-slate-800">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

      <p className="text-center text-slate-600 mb-4">Drag the books into the correct order.</p>

      <div 
        className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-4 min-h-[200px] flex-grow"
        onDragOver={handleDragOver}
        onDrop={handleDropOnTarget}
      >
        {userOrder.map((book, index) => (
           <div key={book.name} 
             onClick={() => handleBookReturn(book)}
             className="bg-white p-3 m-1 rounded-lg shadow-sm cursor-pointer text-center border-2 border-slate-200">
             <span className="font-bold text-slate-400">{index + 1}.</span> {book.name}
           </div>
        ))}
        {userOrder.length === 0 && <div className="flex items-center justify-center h-full"><p className="text-slate-400">Drop books here</p></div>}
      </div>

      <div className="my-4 text-center text-slate-400 font-bold">▲ DRAG FROM HERE ▲</div>
      
      <div 
        className="bg-slate-100 rounded-lg p-4 min-h-[150px] flex flex-wrap justify-center items-start gap-2"
      >
        {shuffledBooks.map(book => (
           <div key={book.name} 
             draggable 
             onDragStart={(e) => handleDragStart(e, book)}
             className="bg-sky-500 text-white p-3 rounded-lg shadow-md cursor-grab active:cursor-grabbing border-b-4 border-sky-700 active:border-b-2">
             {book.name}
           </div>
        ))}
      </div>

      {GameFeedback}

      <div className="mt-auto pt-4 flex gap-4">
        {gameState !== 'correct' ? (
          <>
            <button
                onClick={checkAnswer}
                disabled={shuffledBooks.length > 0}
                className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed border-b-4 border-green-700 disabled:border-slate-400 active:border-b-2"
                >
                Check Answer
            </button>
            <button
                onClick={setupGame}
                className="w-full bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl border-b-4 border-slate-400 active:border-b-2"
                >
                Reset
            </button>
          </>
        ) : (
             <button
                onClick={onBack}
                className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-xl transition-colors border-b-4 border-green-700 active:border-b-2"
                >
                Continue
            </button>
        )}
      </div>
    </div>
  );
};

export default BookOrderGame;