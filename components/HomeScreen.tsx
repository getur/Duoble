import React from 'react';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className={`flex items-center p-4 border-2 border-slate-200 rounded-xl bg-white`}>
    <div className={`${color} text-white p-3 rounded-lg mr-4`}>
        {icon}
    </div>
    <div>
      <p className="text-slate-500 font-bold">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);


const HomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col h-full space-y-6 animate-fade-in">
        <div className="border-2 border-slate-200 rounded-xl p-6 bg-white">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Your Progress</h2>
            <div className="grid grid-cols-2 gap-4">
                <StatCard 
                    title="Day Streak"
                    value={7}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                    color="bg-orange-400"
                />
                 <StatCard 
                    title="Verses Memorized"
                    value={12}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
                    color="bg-red-500"
                />
            </div>
        </div>
        <div className="border-2 border-slate-200 rounded-xl p-6 bg-white">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Daily Goal</h3>
            <p className="text-slate-600 mb-4">Complete one more lesson to reach your daily goal!</p>
            <div className="w-full bg-slate-200 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full" style={{width: '66%'}}></div>
            </div>
        </div>
    </div>
  );
};

export default HomeScreen;