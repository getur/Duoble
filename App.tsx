import React, { useState, useCallback } from 'react';
import type { View } from './types';
import BookOrderGame from './components/BookOrderGame';
import VerseMemorizer from './components/VerseMemorizer';
import HomeScreen from './components/HomeScreen';
import LearnScreen from './components/LearnScreen';
import ProfileScreen from './components/ProfileScreen';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('learn');
  const [activeGame, setActiveGame] = useState<{ type: 'bookOrder'; category: string, testament?: 'Old' | 'New' } | null>(null);

  const navigateTo = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const startGame = useCallback((category: string, testament?: 'Old' | 'New') => {
    setActiveGame({ type: 'bookOrder', category, testament });
  }, []);
  
  const stopGame = useCallback(() => {
    setActiveGame(null);
  }, []);

  const renderView = () => {
    if (activeGame?.type === 'bookOrder') {
        return <BookOrderGame category={activeGame.category} testament={activeGame.testament} onBack={stopGame} />;
    }

    switch (currentView) {
      case 'home':
        return <HomeScreen />;
      case 'memorize':
        return <VerseMemorizer />;
      case 'profile':
        return <ProfileScreen />;
      case 'learn':
      default:
        return <LearnScreen onStartGame={startGame} />;
    }
  };
  
  const getHeaderTitle = () => {
    if (activeGame) return "Book Order Challenge";
    switch (currentView) {
        case 'home': return "Home";
        case 'memorize': return "Verse Memorizer";
        case 'profile': return "Profile";
        case 'learn': return "Learn the Bible";
        default: return "Bible Learner";
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans max-w-md mx-auto shadow-2xl">
        <header className="bg-white sticky top-0 z-10 p-4 border-b-2 border-slate-200">
            <h1 className="text-xl font-bold text-slate-800 text-center">{getHeaderTitle()}</h1>
        </header>
      <main className="w-full flex-grow p-4 pb-24">
        {renderView()}
      </main>
      {!activeGame && (
         <BottomNav currentView={currentView} onNavigate={navigateTo} />
      )}
    </div>
  );
};

export default App;