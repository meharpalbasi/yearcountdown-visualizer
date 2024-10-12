import React from 'react';

const MementoMoriCalendar = ({ currentWeek }) => {
  const totalWeeks = 52;
  
  return (
    <div className="grid grid-cols-13 gap-1 mt-8">
      {[...Array(totalWeeks)].map((_, index) => (
        <div
          key={index}
          className={`w-4 h-4 border border-white ${
            index < currentWeek ? 'bg-white' : 'bg-transparent'
          }`}
        />
      ))}
    </div>
  );
};

export default MementoMoriCalendar;