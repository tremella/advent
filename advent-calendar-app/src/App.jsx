import React from 'react';
import Calendar from './components/Calendar/Calendar';
import contentData from './data/contentData';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Advent Calendar</h1>
      </header>
      <main>
        <Calendar contentData={contentData} />
      </main>
    </div>
  );
}

export default App;
