import React from 'react';
import './Calendar.css'; // Make sure to create a corresponding CSS file for styling

const Calendar = ({ onDayClick }) => {
  const days = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <div className="calendar">
      {days.map(day => (
        <div key={day} className="calendar-day" onClick={() => onDayClick(day)}>
          {day}
        </div>
      ))}
    </div>
  );
};

export default Calendar;