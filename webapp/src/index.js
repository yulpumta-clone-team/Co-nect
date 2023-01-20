import React from 'react';
import ReactDOM from 'react-dom';
import worker from 'mocks/browser';
import Styles from 'styles';
import DemoAlert from 'components/DemoAlert';
import App from './App';

let isDemo = false;

if (process.env.REACT_APP_MOCK_TOOL === 'msw' || process.env.REACT_APP_MOCK_TOOL === 'demo') {
  worker.start();
  isDemo = true;
}

ReactDOM.render(
  <React.StrictMode>
    <Styles>
      {isDemo && <DemoAlert />}
      <App />
    </Styles>
  </React.StrictMode>,
  document.getElementById('root'),
);
