import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { LinkedIn } from 'lucide-react';

const YearProgress = () => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);
      
      const totalDays = (new Date(now.getFullYear(), 11, 31) - start) / oneDay;
      const progressPercentage = (dayOfYear / totalDays) * 100;
      
      setProgress(progressPercentage);
      setCurrentYear(now.getFullYear());

      // Calculate time left
      const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
      const timeLeftMs = endOfYear - now;

      const months = Math.floor(timeLeftMs / (30.44 * 24 * 60 * 60 * 1000));
      const days = Math.floor((timeLeftMs % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
      const hours = Math.floor((timeLeftMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((timeLeftMs % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((timeLeftMs % (60 * 1000)) / 1000);

      setTimeLeft({ months, days, hours, minutes, seconds });
    };

    calculateProgress();
    const timer = setInterval(calculateProgress, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto text-center font-mono text-white">
      <h1 className="text-6xl font-bold mb-8">{currentYear}</h1>
      <Progress value={progress} className="h-4 mb-4 bg-white/10" indicatorClassName="bg-white" />
      <p className="text-4xl font-bold mb-8">{progress.toFixed(0)}%</p>
      <p className="text-sm mb-8">
        {timeLeft.months} months, {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes, {timeLeft.seconds} seconds left
      </p>
      <div className="flex justify-center space-x-4">
        <a href="https://twitter.com/your-twitter-handle" target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer">
          <LinkedIn className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default YearProgress;