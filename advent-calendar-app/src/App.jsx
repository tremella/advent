import React, { useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import YoutubeContent from './components/YoutubeContent/YoutubeContent';
import JavascriptAnimation from './components/JavascriptAnimation/JavascriptAnimation';
import contentData from './data/contentData.js';

function App() {
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
      // ... cases for other content types
      default:
        return <div>Content type not supported</div>;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Advent Calendar</h1>
      </header>
      <main>
        <Calendar onDayClick={handleDayClick} />
        <div className="content-display">
          {selectedDay !== null && renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
