import React, { useState } from 'react';
import './Calendar.css';
import Modal from 'react-modal';
import YoutubeContent from '../YoutubeContent/YoutubeContent';
import JavascriptAnimation from '../JavascriptAnimation/JavascriptAnimation';
// ... import other content type components as needed

Modal.setAppElement('#root'); // Set a root app element for accessibility

const Calendar = ({ contentData }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDayClick = day => {
    const dayData = contentData[day];
    setSelectedDay(day);
    console.log('dayData', dayData);

    // Open modal only if the day's content is a JavascriptAnimation
    if (dayData && dayData.type === 'javascript' || dayData.type === 'youtube') {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderContent = (day) => {
    const dayData = contentData[day];
    if (!dayData) return null;

    switch(dayData.type) {
      case 'youtube':
        console.log(dayData)
        return <YoutubeContent data={dayData} />;
      case 'javascript':
        return <JavascriptAnimation data={dayData} />;
      // ... other content types
      default:
        return null;
    }
  };

  return (
    <div className="calendar">
      {/* renders content in square */}
      {Array.from({ length: 24 }, (_, i) => i + 1).map(day => (
        <div key={`day-${day}`} className="calendar-day" onClick={() => handleDayClick(day)}>
          <div className="day-number">{day}</div>

          {/* // for now, we render nothing in the squares // */}

          {/* for each item in the calendar, if its day is the same as the selected day, and the contentType isn't JS, render content */}
          {/* {selectedDay === day && contentData[selectedDay] 
          && (contentData[selectedDay].type !== 'javascript' ) && (
            <div className="content-container">
              {renderContent(selectedDay)}
            </div>
          )} */}
        </div>
      ))}
      {/* renders content in modal */}
      {selectedDay !== null && contentData[selectedDay] 
      // && contentData[selectedDay].type === 'javascript' 
      && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            },
            content: {
              backgroundColor: 'transparent',
              border: 'none'          
            }        
          }}
          contentLabel="JavaScript Animation Modal"
        >
        <div className="modal-content">
        {selectedDay !== null && renderContent(selectedDay)}
          <button className="modal-close" onClick={closeModal}>X</button>
        </div>
         </Modal>
      )}
    </div>
  );
};

export default Calendar;
