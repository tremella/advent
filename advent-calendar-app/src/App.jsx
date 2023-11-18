
import './App.css'


import './index.css';

const AdventCalendar = () => {
  const days = Array.from({ length: 25 }, (_, index) => index + 1);

  const getContentForDay = (day) => {
    // Assume content items are stored in subdirectories named 1, 2, 3, ..., 25
    try {
      const content = require(`./content/${day}/content.json`);
      return content;
    } catch (error) {
      console.error(`Error loading content for day ${day}:`, error);
      return null;
    }
  };

  const handleDayClick = (day) => {
    // Placeholder function for handling day clicks
    console.log(`Day ${day} clicked!`);
  };

  return (
    <div className="app">
      <div className="advent-calendar">
        {days.map(day => (
          <div key={day} className="calendar-day" onClick={() => handleDayClick(day)}>
            <span>{day}</span>
            {getContentForDay(day) && (
              <div className="content">
                {/* Render your content here, e.g., content.title, content.image, etc. */}
                <p>{getContentForDay(day).title}</p>
                {/* Add more content elements as needed */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdventCalendar;

