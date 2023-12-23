import React, { useState, useEffect } from 'react';
import './Calendar.css';
import Modal from 'react-modal';
import YoutubeContent from '../YoutubeContent/YoutubeContent';
import JavascriptAnimation from '../JavascriptAnimation/JavascriptAnimation';
import StyledText from '../StyledText/StyledText';
import SantaSleighCanvas from '../SantaSleigh/SantaSleigh';
import Envelope from '../Envelope/Envelope';

// ... import other content type components as needed

Modal.setAppElement('#root'); // Set a root app element for accessibility

const Calendar = ({ contentData }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uniqueKey, setUniqueKey] = useState(Date.now());  
  const [pageBackgroundImage, setPageBackgroundImage] = useState('url("/advent/backgrounds/main.svg")');
  const [containerBgColor, setContainerBgColor] = useState('4caf4fd0'); // default color
  const [backgroundToggled, setBackgroundToggled] = useState(false);



  const updateH1Color = (color) => {    
    const h1 = document.querySelector('.main-header');
    if (h1) {      
      h1.style.color = color;
    }
  };

  const getDateStatus = day => {
    const currentDate = new Date();
    // const currentDate = new Date(2023, 11, 24); // dummy date for testing purposes
    if ((day < currentDate.getDate() && currentDate.getMonth() == 11) || currentDate.getFullYear() > 2023) {
      return "past";
    } else if (day == currentDate.getDate() && currentDate.getMonth() == 11 && currentDate.getFullYear() == 2023) {
      return "current";
    } else {
      return "future";
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setUniqueKey(Date.now()); // Update the key to a current timestamp
  };

  useEffect(() => {
    document.documentElement.style.backgroundImage = pageBackgroundImage;
  }, [pageBackgroundImage]);

  const handleDayClick = (day, status) => {    
    const dayData = contentData[day];
    if ((status === "past" || status === "current") && dayData) {       
      setSelectedDay(day);
      if (dayData.type === "wallpaper_cursor") {
        if (!backgroundToggled) {
          setPageBackgroundImage(`url("${dayData.backgroundImageUrl}")`); // Update the background image based on the dayData
          setContainerBgColor(dayData.backgroundColor || '#4caf4fd0'); // Update container color
          updateH1Color(dayData.h1Color);
          setBackgroundToggled(true);
        }
        else {
          setPageBackgroundImage(`url("/advent/backgrounds/main.svg")`);
          setContainerBgColor('#4caf4fd0');
          updateH1Color('rgb(25, 94, 29)');
          setBackgroundToggled(false);
        }
      } else if (dayData.type === "santa"){
        setUniqueKey(Date.now());
      }
      else {
        openModal();
      }      
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
    const patternNumber = day % 24; // Calculate the pattern number based on the day
  
    const handleDayClickLocal = () => {
      setIsActive(true);
      setTimeout(() => {
        handleDayClick(day, status);
      }, 400);
    };
  
    const viewClass = isViewed ? "viewed" : null;
  
    return (
      <div
        role="button"
        tabIndex = "0"
        className={`calendar-day ${viewClass} ${isActive ? "active" : ""} ${status}`}
        onClick={handleDayClickLocal}
        data-pattern={patternNumber}
      >
        <img className="present" src="/advent/present.png" alt="" />
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
        return <YoutubeContent key={uniqueKey} data={dayData} />;
      case 'javascript':
        return  <JavascriptAnimation key={uniqueKey} data={contentData[selectedDay]} />
      case 'text':
          return <StyledText key={uniqueKey} data={dayData} />;
      case 'wallpaper_cursor':
        return null;          
      case 'santa':        
        return <SantaSleighCanvas key={uniqueKey} width={800} height={600} />
      case 'envelope':
        return <Envelope />
      default:
        return null;
    }
  };

  return (
    <div className="calendar-container" style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: containerBgColor }}>
      <div className="calendar">
        {/* renders content in square */}
        {Array.from({ length: 24 }, (_, i) => (
          <DayTile key={`day-${i + 1}`} day={i + 1} />
        ))}
        {/* renders content in modal */}
        {selectedDay !== null && contentData[selectedDay] 
        && contentData[selectedDay].type !== 'wallpaper_cursor' 
        && contentData[selectedDay.type] !== 'santa'        
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
              overflow: 'visible',
              border: 'none',
              width: 'max-content', // Adjust the width as needed
              maxWidth: '800px',
              height: 'auto', // Adjust the height as needed, or use 'auto' for content-based sizing
              marginLeft: 'auto', // These two lines center the modal horizontally
              marginRight: 'auto',
              marginTop: '10%',
              padding: '0',
            }        
          }}
          contentLabel="Advent Content Modal"
          >
          <div className="modal-content">          
          {selectedDay !== null && renderContent(selectedDay)}          
            <button className="modal-close" onClick={closeModal}></button>
          </div>
          </Modal>
        )}
         {/* Render alternative content for santa type */}
         {selectedDay !== null && contentData[selectedDay] 
        && (contentData[selectedDay].type === 'santa')
        && renderContent(selectedDay)}
        </div>
      </div>
  );
};

export default Calendar;
