import React from 'react';
import { BOOK_CATEGORIES } from '../constants';

interface LearnScreenProps {
  onStartGame: (category: string, testament?: 'Old' | 'New') => void;
}

type LevelStatus = 'completed' | 'current' | 'locked';

const LevelNode: React.FC<{
  categoryName: string;
  category: string;
  testament?: 'Old' | 'New';
  status: LevelStatus;
  align: 'left' | 'right';
  onClick: () => void;
}> = ({ categoryName, status, align, onClick }) => {
  const isLocked = status === 'locked';
  
  const colors = {
    completed: { bg: 'bg-green-500', border: 'border-green-700', icon: 'text-white' },
    current: { bg: 'bg-sky-500', border: 'border-sky-700', icon: 'text-white' },
    locked: { bg: 'bg-slate-200', border: 'border-slate-400', icon: 'text-slate-400' },
  };
  
  const buttonContent = (
    <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-transform duration-200 ${!isLocked ? 'hover:scale-110' : ''} ${colors[status].bg} border-b-8 ${colors[status].border}`}>
      <span className={colors[status].icon}>
        {status === 'completed' && <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
        {status === 'current' && <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
        {status === 'locked' && <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>}
      </span>
      {status === 'current' && (
          <div className="absolute -bottom-7 bg-white py-1 px-4 rounded-lg border-2 border-slate-200 shadow-sm">
              <span className="font-bold uppercase text-sky-500">Start</span>
          </div>
      )}
    </div>
  );

  return (
    <div className={`relative flex items-center my-8 ${align === 'left' ? 'justify-start' : 'justify-end'}`}>
      <div className={`w-1/2 flex ${align === 'left' ? 'justify-end pr-12' : 'justify-start pl-12'}`}>
        <button onClick={onClick} disabled={isLocked} className="relative group">
          {buttonContent}
          <div className="absolute -top-8 w-full text-center">
             <p className={`font-bold text-slate-700 ${isLocked ? 'text-slate-400' : ''}`}>{categoryName}</p>
          </div>
        </button>
      </div>
    </div>
  );
};

const PathLine = () => (
    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-2 bg-slate-200" />
);


const LearnScreen: React.FC<LearnScreenProps> = ({ onStartGame }) => {
  // Mock progress: first 3 are completed, 4th is current, rest are locked
  const progressIndex = 3;

  const getStatus = (index: number): LevelStatus => {
      if (index < progressIndex) return 'completed';
      if (index === progressIndex) return 'current';
      return 'locked';
  }

  return (
    <div className="relative">
      <PathLine />
      {BOOK_CATEGORIES.map((cat, index) => (
        <LevelNode 
          key={cat.name}
          categoryName={cat.name}
          category={cat.category}
          testament={cat.testament as ('Old' | 'New' | undefined)}
          status={getStatus(index)}
          align={index % 2 === 0 ? 'left' : 'right'}
          onClick={() => onStartGame(cat.category, cat.testament as ('Old' | 'New' | undefined))}
        />
      ))}
    </div>
  );
};

export default LearnScreen;
