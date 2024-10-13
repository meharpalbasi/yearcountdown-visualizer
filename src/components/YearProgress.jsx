import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import MementoMoriCalendar from './MementoMoriCalendar';

const YearProgress = () => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});
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
      setCurrentWeek(Math.floor(dayOfYear / 7) + 1);

      // Calculate time left
      const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
      const timeLeftMs = endOfYear - now;
      
      // For demonstration purposes, we'll use 80 days left
      const eightyDaysMs = 80 * 24 * 60 * 60 * 1000;
      const timeLeftToUse = Math.min(timeLeftMs, eightyDaysMs);

      const months = Math.floor(timeLeftToUse / (30.44 * 24 * 60 * 60 * 1000));
      const days = Math.floor((timeLeftToUse % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
      const hours = Math.floor((timeLeftToUse % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((timeLeftToUse % (60 * 60 * 1000)) / (60 * 1000));

      setTimeLeft({ months, days, hours, minutes });
    };

    calculateProgress();
    const timer = setInterval(calculateProgress, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-80 sm:w-96">
      <Progress value={progress} className="h-4 mb-4" />
      <p className="text-2xl font-semibold mb-2">{progress.toFixed(2)}% of year completed</p>
      <p className="text-xl mb-4">
        Time left: {timeLeft.months} months, {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes
      </p>
      <MementoMoriCalendar currentWeek={currentWeek} />
    </div>
  );
};

export default YearProgress;