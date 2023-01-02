import React from 'react';
import ReactDOM from 'react-dom';
import worker from 'mocks/browser';
import Styles from 'styles';
import App from './App';

if (process.env.REACT_APP_MOCK_TOOL === 'msw') {
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <Styles>
      <App />
    </Styles>
  </React.StrictMode>,
  document.getElementById('root'),
);
