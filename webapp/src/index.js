import React from 'react';
import ReactDOM from 'react-dom';
import worker from 'mocks/browser';
import App from './App';

if (process.env.REACT_APP_MOCK_TOOL === 'msw') {
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
