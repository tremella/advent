import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

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

