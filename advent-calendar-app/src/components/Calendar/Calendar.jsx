import React, { useState } from 'react';
import './Calendar.css';
import YoutubeContent from '../YoutubeContent/YoutubeContent';
import JavascriptAnimation from '../JavascriptAnimation/JavascriptAnimation';
// ... import other content type components as needed

const Calendar = ({ contentData }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = day => {
    setSelectedDay(day);
  };

  const renderContent = () => {
    const dayData = contentData[selectedDay];
    if (!dayData) return <div>Select a day</div>;

    switch(dayData.type) {
      case 'youtube':
        return <YoutubeContent data={dayData} />;
      case 'javascript':
        return <JavascriptAnimation data={dayData} />;
      // ... other content types
      default:
        return <div>Content type not supported</div>;
    }
  };

  return (
    <div>
      <div className="calendar">
        {Array.from({ length: 24 }, (_, i) => i + 1).map(day => (
          <div key={day} className="calendar-day" onClick={() => handleDayClick(day)}>
            {day}
          </div>
        ))}
      </div>
      <div className="content-display">
        {selectedDay !== null && renderContent()}
      </div>
    </div>
  );
};

export default Calendar;
