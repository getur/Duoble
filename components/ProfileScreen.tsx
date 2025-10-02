import React from 'react';

const ProfileScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-slate-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-slate-800">BibleStudent123</h2>

      <div className="w-full bg-white border-2 border-slate-200 rounded-xl p-4">
        <h3 className="text-lg font-bold text-slate-700 mb-4">Statistics</h3>
        <ul className="space-y-3">
          <li className="flex justify-between items-center">
            <span className="text-slate-600">Joined</span>
            <span className="font-bold text-slate-800">July 2024</span>
          </li>
           <li className="flex justify-between items-center">
            <span className="text-slate-600">Total XP</span>
            <span className="font-bold text-slate-800">1,250</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-slate-600">Lessons Completed</span>
            <span className="font-bold text-slate-800">15</span>
          </li>
           <li className="flex justify-between items-center">
            <span className="text-slate-600">Current League</span>
            <span className="font-bold text-slate-800">Bronze</span>
          </li>
        </ul>
      </div>

       <button className="w-full bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl border-b-4 border-slate-400 active:border-b-2">
            Log Out
       </button>
    </div>
  );
};

export default ProfileScreen;
