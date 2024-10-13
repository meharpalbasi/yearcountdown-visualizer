import React from 'react';
import YearProgress from '../components/YearProgress';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-8">Year Progress</h1>
        <YearProgress />
      </div>
    </div>
  );
};

export default Index;