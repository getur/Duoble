import React, { useState, useMemo, useCallback } from 'react';
import { parseVerseWithGemini } from '../services/geminiService';
import type { ParsedVerse } from '../types';

const VerseMemorizer: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [parsedVerse, setParsedVerse] = useState<ParsedVerse | null>(null);
  const [quizWords, setQuizWords] = useState<string[]>([]);
  const [blankIndices, setBlankIndices] = useState<number[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isQuizChecked, setIsQuizChecked] = useState(false);

  const createQuiz = useCallback((verseText: string) => {
    const words = verseText.split(/\s+/);
    setQuizWords(words);
    
    const wordCount = words.length;
    const blankCount = Math.max(1, Math.floor(wordCount * 0.25));
    
    const indices = Array.from(Array(wordCount).keys());
    const shuffledIndices = indices.sort(() => 0.5 - Math.random());
    const selectedIndices = shuffledIndices.slice(0, blankCount).sort((a,b) => a-b);
    
    setBlankIndices(selectedIndices);
    setUserAnswers(new Array(selectedIndices.length).fill(''));
    setIsQuizChecked(false);
  }, []);

  const handleCreateQuiz = async () => {
    if (!userInput.trim()) {
      setError("Please enter a verse.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setParsedVerse(null);

    try {
      const result = await parseVerseWithGemini(userInput);
      setParsedVerse(result);
      createQuiz(result.text);
    } catch (e: any) {
      setError(e.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };
  
  const checkQuiz = () => {
      setIsQuizChecked(true);
  };
  
  const resetQuiz = () => {
      setParsedVerse(null);
      setUserInput('');
      setError(null);
  };

  const renderQuiz = () => {
    if (!parsedVerse) return null;

    let blankCounter = -1;
    return (
      <div className="mt-6 bg-white p-6 rounded-xl border-2 border-slate-200">
        <h3 className="text-lg font-bold text-slate-700">{parsedVerse.book} {parsedVerse.chapter}:{parsedVerse.verse}</h3>
        <p className="mt-4 text-xl leading-relaxed text-slate-800">
          {quizWords.map((word, index) => {
            if (blankIndices.includes(index)) {
              blankCounter++;
              const blankIndex = blankCounter;
              const isCorrect = userAnswers[blankIndex].trim().toLowerCase() === quizWords[index].replace(/[.,:;!?]/g, '').toLowerCase();
              
              return (
                <span key={index} className="inline-block mx-1">
                  <input
                    type="text"
                    value={userAnswers[blankIndex]}
                    onChange={(e) => handleAnswerChange(blankIndex, e.target.value)}
                    className={`w-28 px-1 py-0.5 border-b-2 text-center focus:outline-none transition-colors
                      ${!isQuizChecked ? 'border-sky-300 focus:border-sky-500 bg-sky-50' :
                       isCorrect ? 'border-green-500 bg-green-100 text-green-800 font-bold' : 'border-red-500 bg-red-100'}`}
                  />
                </span>
              );
            }
            return ` ${word} `;
          })}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button onClick={checkQuiz} className="flex-1 bg-green-500 text-white font-bold py-3 px-4 rounded-xl border-b-4 border-green-700 active:border-b-2">
                Check Answers
            </button>
            <button onClick={() => createQuiz(parsedVerse.text)} className="flex-1 bg-sky-500 text-white font-bold py-3 px-4 rounded-xl border-b-4 border-sky-700 active:border-b-2">
                New Blanks
            </button>
        </div>
        {isQuizChecked && <p className="mt-4 text-center text-slate-600">Correct answers are highlighted in green.</p>}
      </div>
    );
  };

  return (
    <div className="p-4">
      <p className="text-center text-slate-600 mb-4">Paste a verse to create a fill-in-the-blanks quiz.</p>

      {!parsedVerse ? (
        <div className="bg-white p-6 rounded-xl border-2 border-slate-200">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="e.g., John 3:16 For God so loved the world..."
            className="w-full h-32 p-3 border-2 bg-slate-100 border-slate-200 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
            disabled={isLoading}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            onClick={handleCreateQuiz}
            className="w-full mt-4 bg-sky-500 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:bg-slate-300 border-b-4 border-sky-700 active:border-b-2 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isLoading ? 'Analyzing...' : 'Create Quiz'}
          </button>
        </div>
      ) : (
        <div>
            {renderQuiz()}
             <button
                onClick={resetQuiz}
                className="w-full mt-4 bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl border-b-4 border-slate-400 active:border-b-2"
             >
                Enter a New Verse
             </button>
        </div>
      )}
    </div>
  );
};

export default VerseMemorizer;