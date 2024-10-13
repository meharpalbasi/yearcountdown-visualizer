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
    };

    const calculateTimeLeft = () => {
      const now = new Date();
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
    calculateTimeLeft();
    const timer = setInterval(() => {
      calculateTimeLeft();
      calculateProgress();
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-80 sm:w-96">
      <Progress value={progress} className="h-4 mb-4" />
      <p className="text-2xl font-semibold mb-2">{progress.toFixed(2)}% of year completed</p>
      <MementoMoriCalendar currentWeek={currentWeek} />
      <p className="text-xl mb-4 mt-6">
        Time left: {timeLeft.months} months, {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes, {timeLeft.seconds} seconds
      </p>
    </div>
  );
};

export default YearProgress;
