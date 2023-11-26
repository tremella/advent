import React, { useState } from 'react';
import './Calendar.css';
import Modal from 'react-modal';
import YoutubeContent from '../YoutubeContent/YoutubeContent';
import JavascriptAnimation from '../JavascriptAnimation/JavascriptAnimation';
import StyledText from '../StyledText/StyledText';
// ... import other content type components as needed

Modal.setAppElement('#root'); // Set a root app element for accessibility

const Calendar = ({ contentData }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isDateValid = day => {

    // change this to december when it happens. Until then, we test in november. 
    const startDate = new Date(2023, 11, 1); // November is 10 because months are zero-indexed
    
    // const currentDate = new Date();
    const currentDate = new Date(2023, 10, 3); // dummy date for testing purposes

    
    if (day <= currentDate.getDate() && currentDate >= startDate) {
      return true;
    } else {
      // You can handle the error case here, e.g., log an error message or play an error noise
      console.error('Invalid date selected.');
      return false;
    }
  };
  const getDateStatus = day => {
    //const currentDate = new Date();
    const currentDate = new Date(2023, 11, 6); // dummy date for testing purposes
    if ((day < currentDate.getDate() && currentDate.getMonth() == 11) || currentDate.getFullYear() > 2023) {
      return "past";
    } else if (day == currentDate.getDate() && currentDate.getMonth() == 11 && currentDate.getFullYear() == 2023) {
      return "current";
    } else {
      return "future";
    }
  };
  const handleDayClick = (day, status) => {
    console.log(status, day)
    const dayData = contentData[day];
    setSelectedDay(day);
    if ((status === "past" || status === "current") && dayData) {       
      setIsModalOpen(true);
      const viewedDays = JSON.parse(localStorage.getItem('viewedDays')) || {};
      viewedDays[day] = true; // Mark the day as viewed
      localStorage.setItem('viewedDays', JSON.stringify(viewedDays));
    }
  };

  const DayTile = ({ day }) => {
    const [isActive, setIsActive] = useState(false);
    const viewedDays = JSON.parse(localStorage.getItem('viewedDays')) || {};
    const isViewed = viewedDays[day];
    const status = getDateStatus(day);
    const handleDayClickLocal = event => {
      setIsActive(true);
      // handleDayClick(day);
      // wait 1 second
      setTimeout(() => {
        handleDayClick(day, status);
      }, 500);
    };

    const viewClass = isViewed ? "viewed" : null; // Change color if viewed
  
    return (
      <div role="button" className={`calendar-day ${viewClass} ${isActive ? "active": ""} ${status}`} onClick={() => handleDayClickLocal(day, status)}>
        <img className="present" src="/present.png" alt="" />
        <div className="day-number">{day}</div>
      </div>
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderContent = (day) => {

    // this is where we feed in the data for a SPECIFIC day to our content components
    // aka de-indexing 
    
    const dayData = contentData[day];
    if (!dayData) return null;
    switch(dayData.type) {
      case 'youtube':
        return <YoutubeContent data={dayData} />;
      case 'javascript':
        return <JavascriptAnimation data={dayData} />;
      case 'text':
          return <StyledText data={dayData} />;
      default:
        return null;
    }
  };

  return (
    <div className="calendar">
      {/* renders content in square */}
      {Array.from({ length: 24 }, (_, i) => (
        <DayTile key={`day-${i + 1}`} day={i + 1} />
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
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              backgroundColor: 'transparent',
              border: 'none',
              width: 'auto', // Adjust the width as needed
              maxWidth: '600px',
              height: 'auto', // Adjust the height as needed, or use 'auto' for content-based sizing
              marginLeft: 'auto', // These two lines center the modal horizontally
              marginRight: 'auto',
              marginTop: '10%',
            }        
          }}
          contentLabel="Advent Content Modal"
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
