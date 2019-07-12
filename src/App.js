import React from 'react';
import './App.css';
import { Charts } from './Charts';
import Form from './example';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-000000-01', {
  debug: true,
  titleCase: false,
  gaOptions: {
    userId: 123
  }
});
ReactGA.pageview(window.location.pathname + window.location.search);

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
