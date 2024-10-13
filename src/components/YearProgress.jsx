import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Twitter, Facebook } from 'lucide-react';

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
    const timer = setInterval(calculateProgress, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto text-center font-mono text-white">
      <h1 className="text-8xl font-bold mb-8">{currentYear}</h1>
      <Progress value={progress} className="h-4 mb-8 bg-white/10" indicatorClassName="bg-white" />
      <p className="text-6xl font-bold mb-16">{progress.toFixed(0)}%</p>
      <p className="text-sm mb-16">
        {timeLeft.months} months, {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes, {timeLeft.seconds} seconds left
      </p>
      <div className="flex justify-center space-x-4">
        <a href="https://twitter.com/your-twitter-handle" target="_blank" rel="noopener noreferrer">
          <Twitter className="w-6 h-6" />
        </a>
        <a href="https://www.facebook.com/your-facebook-profile" target="_blank" rel="noopener noreferrer">
          <Facebook className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default YearProgress;