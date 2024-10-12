import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import MementoMoriCalendar from './MementoMoriCalendar';

const YearProgress = () => {
  const [progress, setProgress] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);

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
      setDaysLeft(Math.ceil(totalDays - dayOfYear));
      setCurrentWeek(Math.floor(dayOfYear / 7) + 1);
    };

    calculateProgress();
    const timer = setInterval(calculateProgress, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-80 sm:w-96">
      <Progress value={progress} className="h-4 mb-4" />
      <p className="text-2xl font-semibold mb-2">{progress.toFixed(2)}% of year completed</p>
      <p className="text-xl mb-4">{daysLeft} days left in the year</p>
      <MementoMoriCalendar currentWeek={currentWeek} />
    </div>
  );
};

export default YearProgress;