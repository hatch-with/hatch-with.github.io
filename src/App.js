import React from 'react';
import './App.css';
import { Charts } from './Charts';
import Form from './NameForm';

function App() {
  const content = (
    <header className="App-header">
      <Form />
      {/* < Charts /> */}
    </header>
  )
  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
