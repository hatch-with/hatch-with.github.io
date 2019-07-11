import React from 'react';
import './App.css';
import { Charts } from './Charts';
function App() {
  const content = (
    <header className="App-header">
      < Charts />
    </header>
  )
  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
